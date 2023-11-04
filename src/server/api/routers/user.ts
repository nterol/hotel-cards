import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  getUserByID: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    try {
      return await ctx.db.users.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
        cause: error,
      });
    }
  }),
});
