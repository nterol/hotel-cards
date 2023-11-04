import { getOpeningWithStock } from '@/utils/getOpeningWithStock';

import { createTRPCRouter, publicProcedure } from '../trpc';

export type OpeningMap = [
  number,
  {
    stock: number;
    id: number;
    sale_id: number;
    room_id: number;
    date: Date;
    price: number;
    discount_price: number;
  }[],
][];

export const openingsRouter = createTRPCRouter({
  getOpenings: publicProcedure.query(async ({ ctx }) => {
    let openingMap: OpeningMap = [];
    const hotelIDs = await ctx.db.hotels.findMany({ select: { id: true } });
    const allHotelIDs = hotelIDs.map(({ id }) => id);

    // Nesting recursive promise to access upper scope variable
    async function getOpeningByDate(
      prevSaleID?: number,
      leftOverHotelID?: number[],
    ): Promise<OpeningMap | ((prevSaleID?: number, leftOverHotelID?: number[]) => Promise<OpeningMap>)> {
      // Retrieving current sale period
      const currentSale = await ctx.db.sale_dates.findFirst({
        orderBy: { end_date: 'desc' },
        ...(prevSaleID ? { where: { id: { lt: prevSaleID } } } : {}),
        select: { id: true, bookable_days: true },
      });

      if (!currentSale || currentSale.id === prevSaleID) {
        // Means there is no more sales to explore
        return openingMap;
      }

      // Retrieving openings for sale period
      // narrowing it to left over hotels if present
      const searchLeftOver = leftOverHotelID ? { rooms: { hotel_id: { in: leftOverHotelID } } } : {};
      const currentOpenings = await ctx.db.openings.findMany({
        where: {
          sale_id: currentSale.id,
          ...searchLeftOver,
        },
      });

      if (currentOpenings.length === 0) {
        // early returned if no openings for current sales and hotels
        return await getOpeningByDate(currentSale.id, leftOverHotelID);
      }

      const currentBookings = await ctx.db.bookings.findMany({
        where: {
          date: { in: currentSale.bookable_days },
          room_id: { in: [...new Set(currentOpenings.map((c) => c.room_id))] },
        },
      });
      const openingWithStock = getOpeningWithStock({ currentOpenings, currentBookings });

      // Retrieving data to link hotels and bookings
      const concernedHotels = await ctx.db.rooms.findMany({
        where: { id: { in: [...new Set(openingWithStock.map((op) => op.room_id))] } },
        select: { hotel_id: true, id: true },
      });

      const hotelOpenings = new Map<
        number,
        {
          stock: number;
          id: number;
          sale_id: number;
          room_id: number;
          date: Date;
          price: number;
          discount_price: number;
        }[]
      >();

      concernedHotels.forEach(({ id: room_id, hotel_id }) => {
        hotelOpenings.set(hotel_id, [
          ...(hotelOpenings.get(hotel_id) ?? []),
          ...openingWithStock.filter((op) => op.room_id === room_id),
        ]);
      });

      // Pass Map structure to JSON as Array<Array<key, value>>
      openingMap = [...openingMap, ...hotelOpenings];

      // Detect
      const newLeftOver = (leftOverHotelID ? leftOverHotelID : allHotelIDs).filter(
        (hotelID) => !hotelOpenings.has(hotelID),
      );

      if (newLeftOver.length > 0) {
        return await getOpeningByDate(currentSale.id, newLeftOver);
      }

      return openingMap;
    }

    return await getOpeningByDate();
  }),
});
