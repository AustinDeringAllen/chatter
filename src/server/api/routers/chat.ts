import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServerClient } from "~/server/helpers/pusher";

export const chatRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.chat.findMany();

    return messages;
  }),
  getMessage: publicProcedure
    .input(z.object({ roomId: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      const messages = await ctx.prisma.chat.findMany({
        where: {
          roomId: input.roomId,
        },
        orderBy: [
          {
            createdAt: "asc",
          },
        ],
      });
      return messages;
    }),
  submit: publicProcedure
    .input(
      z.object({
        roomId: z.string().cuid(),
        body: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const chat = await ctx.prisma.chat.create({
        data: {
          roomId: input.roomId,
          body: input.body,
        },
      });

      await pusherServerClient.trigger(input.roomId, "message", chat);

      return chat;
    }),
});
