type Args = {
  currentOpenings: {
    id: number;
    sale_id: number;
    room_id: number;
    date: Date;
    stock: number;
    price: number;
    discount_price: number;
  }[];
  currentBookings: {
    id: number;
    date: Date;
    user_id: number;
    room_id: number;
  }[];
};

export function getOpeningWithStock({ currentOpenings, currentBookings }: Args) {
  const bookings = new Map();
  currentBookings.forEach((booking) => {
    bookings.set(booking.room_id, (bookings.get(booking.room_id) ?? 0) + 1);
  });

  return currentOpenings
    .map((opening) => ({
      ...opening,
      stock: opening.stock - (bookings.get(opening.room_id) ?? 0),
    }))
    .filter((booking) => booking.stock > 0);
}
