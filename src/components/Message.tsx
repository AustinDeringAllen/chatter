import Image from "next/image";
import { type Message } from "./ChatRoom";

export default function Message({
  message,
  owned = false,
}: {
  message: Message;
  owned?: boolean;
}) {
  return (
    <div
      className={`flex max-w-xs items-center gap-2 rounded-xl p-2 ${
        owned ? "self-end bg-blue-600" : "bg-green-600"
      }`}
      key={message.id}
    >
      {!owned && (
        <div className="relative h-8 w-8">
          {message.createdBy.image ? (
            <Image
              src={message.createdBy.image ?? ""}
              fill
              objectFit="cover"
              className="rounded-full"
              alt={`Image of ${message.createdBy.name}`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 capitalize">
              {message.createdBy.name &&
                (message.createdBy.name.match(/[a-zA-Z]/) ?? ["?"]).pop()}
            </div>
          )}
        </div>
      )}
      <p className="text-white">{message.message}</p>
    </div>
  );
}
