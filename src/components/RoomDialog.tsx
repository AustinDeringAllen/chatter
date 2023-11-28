import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AvailableRoomList from "./AvailableRoomList";
import { type FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "~/utils/api";

export default function RoomDialog() {
  const [newRoom, setNewRoom] = useState(false);
  const [roomName, setRoomName] = useState("");

  const roomMutate = api.room.create.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    roomMutate.mutate({ name: roomName });
    setRoomName("");
    setNewRoom(false);
  };

  // Make it close more smoothly
  if (newRoom)
    return (
      <Dialog onOpenChange={() => setNewRoom(false)} open={newRoom}>
        <DialogTrigger asChild>
          <Button>Room List</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Room</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5">
              <Checkbox id="private" disabled />
              <Label htmlFor="private">Private Room</Label>
            </div>
            <Button type="submit">Create Room</Button>
          </form>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Room List</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Room List</DialogTitle>
        </DialogHeader>
        <AvailableRoomList />
        <Button onClick={() => setNewRoom(true)}>Create New Room</Button>
      </DialogContent>
    </Dialog>
  );
}
