import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import RoomDialog from "./RoomDialog";

export default function AuthButton() {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex gap-2.5">
        {sessionData && (
          <div className="relative h-8 w-8">
            <Image
              src={sessionData.user.image ?? ""}
              fill
              objectFit="cover"
              className="rounded-full"
              alt={`Profile Image of ${sessionData.user.name}`}
            />
          </div>
        )}
        {sessionData && <RoomDialog />}
        <button onClick={sessionData ? () => void signOut() : () => signIn()}>
          {sessionData ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </>
  );
}
