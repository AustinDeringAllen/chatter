import { useRouter } from "next/router";
import ChatRoom from "~/components/ChatRoom";
import { api } from "~/utils/api";

export default function ChatPage() {
  const router = useRouter();

  return (
    <main className="mx-auto mt-12 max-w-screen-2xl">
      <ChatRoom
        roomId={typeof router.query.id === "string" ? router.query.id : ""}
      />
    </main>
  );
}
