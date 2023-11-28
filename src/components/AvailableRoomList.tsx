import { DialogClose } from "@/components/ui/dialog";
import { type ChatRoom } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function AvailableRoomList() {
  const [availableRooms, setAvailableRooms] = useState<ChatRoom[]>([]);

  const { data } = api.room.getAll.useQuery();

  useEffect(() => {
    if (data) setAvailableRooms(data);
  }, [data]);

  if (availableRooms.length === 0) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col space-y-1.5">
        {availableRooms.map((room) => (
          <DialogClose asChild key={room.id}>
            <Link href={`/chatroom/${room.id}`}>
              <div className="flex h-8 w-full justify-between rounded-lg bg-blue-300 px-4 py-1 hover:bg-blue-500 hover:text-white">
                <div>{room.name}</div>
              </div>
            </Link>
          </DialogClose>
        ))}
      </div>
    </>
  );
}
