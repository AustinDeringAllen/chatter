import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import MessageRoom from "~/components/MessageRoom";
import RoomList from "~/components/RoomList";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <main className="mx-auto max-w-screen-lg text-center">
        <h1 className="text-5xl">WELCOME TO CHATTER</h1>
        <h2 className="text-4xl">Log in with discord to get started</h2>
        <div className="my-12 mx-auto flex max-w-screen-sm justify-around">
          <button
            className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
            onClick={session ? () => void signOut() : () => void signIn()}
          >
            {session ? "Sign out" : "Sign in"}
          </button>

          {session && <RoomList />}
        </div>
        {session && <AuthenticatedChat />}

        <div>
          <h3>
            Don&lsquo;t want to login? Go to the{" "}
            <Link href={"/chat/anon"} className="text-blue-500 hover:underline">
              Anonymous Chat Room
            </Link>{" "}
            .
          </h3>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthenticatedChat = () => {
  return (
    <MessageRoom
      // Hard Coded Room ID :(
      room={"clf1u10y9000adpx2ytvclur8"}
      title={"Authenticated Chat"}
    />
  );
};
