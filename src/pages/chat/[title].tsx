import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ChatRoom = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { title } = router.query;

  if (!session) return <h1>Either no room exists or access has been denied</h1>;

  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default ChatRoom;
