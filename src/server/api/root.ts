import { createTRPCRouter } from '@/server/api/trpc';

import { hotelRouter } from './routers/hostel';
import { openingsRouter } from './routers/openings';
import { userRouter } from './routers/user';

export const appRouter = createTRPCRouter({
  user: userRouter,
  hotel: hotelRouter,
  openings: openingsRouter,
});

export type AppRouter = typeof appRouter;
