import { useDisclosure } from "@mantine/hooks";
import { Modal, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const data = [{ title: "Dylan" }, { title: "Authenticated Chat" }];

const RoomList = () => {
  // const {data, isLoading} = api.room.getAvailable.useQuery();
  const [create, setCreate] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const renderedRooms = data.map((room, i) => {
    return (
      <div key={i} className="flex items-baseline">
        <Link
          href={`/chat/${room.title}`}
          // as={"/chat/TACO"}
          className="text-blue-500 hover:underline"
        >
          {room.title}
        </Link>
        <p className="ml-1 text-sm">
          - Expires <span className="text-red-200">0:00:00</span>
        </p>
      </div>
    );
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setCreate(false);
        }}
        title="Available Rooms"
      >
        {!create && <ListModal renderedRooms={renderedRooms} />}
        {create && <h1>Hi</h1>}
        <div className="flex items-center justify-center">
          <button
            className="rounded-md border border-black p-2"
            onClick={() => setCreate(true)}
          >
            Create Room
          </button>
        </div>
      </Modal>

      <button
        className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
        onClick={open}
      >
        Room List
      </button>
    </>
  );
};

export default RoomList;

const ListModal = ({ renderedRooms }: { renderedRooms: JSX.Element[] }) => {
  return (
    <>
      <ScrollArea className="mb-4 flex flex-col gap-2 text-lg" h={500}>
        {renderedRooms}
      </ScrollArea>
    </>
  );
};
