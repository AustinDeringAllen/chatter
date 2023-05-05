import { type Chat } from "@prisma/client";
import pusherJs from "pusher-js";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import MessageArea from "./MessageArea";
import MessageForm from "./MessageForm";
import { env } from "~/env.mjs";

const MessageRoom = ({ room, title }: { room: string; title: string }) => {
  // Fetch Data ONCE.
  const [messages, setMessages] = useState<Chat[]>([]);
  const { data, isLoading } = api.chat.getMessage.useQuery(
    { roomId: room },
    {
      // enabled: false, // This will disable fetching entirely and you'd have to manually use "refetch()"
      staleTime: 5 * (60 * 1000),
      cacheTime: 10 * (60 * 1000),
      onSuccess: () => {
        setMessages([]);
      },
    }
  );

  useEffect(() => {
    // Pusher.logToConsole = true;
    const pusher = new pusherJs(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(room);
    channel.bind("message", (data: Chat) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.disconnect();
    };
  }, [room]);

  return (
    <>
      <h1 className="text-center text-3xl">
        Welcome to <span className="text-red-500">{title}</span>!
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto flex max-w-screen-md flex-col gap-2 rounded-lg border border-black p-4 pb-0">
          <MessageArea messages={data ? data?.concat(messages) : messages} />
          <hr />
          <MessageForm roomId={room} />
        </div>
      )}
    </>
  );
};

export default MessageRoom;
