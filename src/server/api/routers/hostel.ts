// import { TRPCError } from '@trpc/server';
// import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const hotelRouter = createTRPCRouter({
  getHostels: publicProcedure.query(async ({ ctx }) => {
    const hotels = await ctx.db.hotels.findMany({
      select: {
        id: true,
        name: true,
        stars: true,
        picture_id: true,
        preview: true,
        reviews: {
          select: {
            score: true,
          },
        },
      },
    });

    const formattedHotels = hotels.map(({ reviews, ...rest }) => {
      const average = reviews.length ? (reviews.reduce((a, c) => a + c.score, 0) / reviews.length).toFixed(1) : null;

      return { ...rest, reviews: average ? { average, total: reviews.length } : null };
    });

    return formattedHotels;
  }),
});
