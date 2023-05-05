import { ScrollArea } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { type Chat } from "@prisma/client";

const MessageArea = ({ messages }: { messages: Chat[] }) => {
  const { scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLDivElement>({
      // offset: 60,
      duration: 250,
    });

  const renderedMessages = messages.map((message, i, array) => {
    return (
      <p key={message.id} ref={i === array.length - 1 ? targetRef : null}>
        {message.body}
      </p>
    );
  });

  scrollIntoView();

  return (
    <>
      <ScrollArea h={300} viewportRef={scrollableRef} className="text-left">
        {renderedMessages}
      </ScrollArea>
    </>
  );
};

export default MessageArea;
