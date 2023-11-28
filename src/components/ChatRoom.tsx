// import { type Message } from "@prisma/client";
import pusherJs from "pusher-js";
import { type FormEvent, useEffect, useState, type ChangeEvent } from "react";
import { env } from "~/env";
import { api } from "~/utils/api";
import MessageView from "./MessageView";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

// Move this somewhere else
export type Message = {
  id: string;
  message: string;
  userId: string;
  createdBy: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export default function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const { data: sessionData } = useSession();

  const messageMutation = api.message.create.useMutation();

  const { data } = api.message.getAllByRoom.useQuery({ roomId }, {});
  const { data: roomData } = api.room.getNameById.useQuery({ id: roomId });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    console.log(text);
    messageMutation.mutate({
      message: text,
      chatId: roomId,
    });
    setText("");
  };

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  useEffect(() => {
    const pusher = new pusherJs(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(roomId);
    channel.bind("message", ({ message }: { message: Message }) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusher.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      <div>
        <h2 className="mb-4 text-center text-5xl">
          {roomData ? roomData.name : "???"}
        </h2>
        <div>
          <MessageView messages={messages} />
        </div>
        {sessionData ? (
          <form onSubmit={sendMessage} className="mt-6">
            <div className="grid w-full gap-2">
              <Textarea
                placeholder="Type your Message here"
                value={text}
                onChange={handleChange}
              />
              <Button>Send message</Button>
            </div>
          </form>
        ) : (
          <div className="mx-auto mt-6 w-min">
            <Button onClick={() => void signIn()}>Sign In To Chat</Button>
          </div>
        )}
      </div>
    </div>
  );
}
