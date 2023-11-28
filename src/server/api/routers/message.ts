import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { pusherServerClient } from "~/server/helpers/pusher";

export const messageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ message: z.string(), chatId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newMessage = await ctx.db.message.create({
        data: {
          message: input.message,
          createdBy: { connect: { id: ctx.session.user.id } },
          chatRoom: { connect: { id: input.chatId } },
        },
        select: {
          id: true,
          message: true,
          userId: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      await pusherServerClient.trigger(input.chatId, "message", {
        message: newMessage,
      });

      return newMessage;
    }),
  getAllByRoom: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.db.message.findMany({
        where: {
          roomId: input.roomId,
        },
        select: {
          id: true,
          message: true,
          userId: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return messages;
    }),
});
