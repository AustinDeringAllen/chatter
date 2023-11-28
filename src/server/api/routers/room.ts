import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.chatRoom.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      console.log(room.id);

      return room;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allRooms = await ctx.db.chatRoom.findMany();

    return allRooms;
  }),
  getNameById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.chatRoom.findFirst({
        where: {
          id: input.id,
        },
        select: {
          name: true,
        },
      });
    }),
});
