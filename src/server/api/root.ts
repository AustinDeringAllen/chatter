// import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { roomRouter } from "./routers/room";
import { messageRouter } from "./routers/message";

export const appRouter = createTRPCRouter({
  room: roomRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
