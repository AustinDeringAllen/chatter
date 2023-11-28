import { type Message as Mess } from "./ChatRoom";
import Message from "./Message";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function MessageView({ messages }: { messages: Mess[] }) {
  const { data: sessionData } = useSession();

  const messageEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEnd.current)
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-96 w-full flex-col space-y-4 overflow-auto rounded-lg bg-gray-100 px-8 py-4">
      {messages.map((message) => {
        return (
          <Message
            message={message}
            owned={sessionData?.user.id === message.createdBy.id}
          />
        );
      })}
      <div ref={messageEnd}></div>
    </div>
  );
}
