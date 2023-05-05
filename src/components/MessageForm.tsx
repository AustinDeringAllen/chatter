import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@mantine/core";
import { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";

interface FormValues {
  body: string;
}

const schema = z
  .object({
    body: z.string().trim().nonempty(),
  })
  .required();

const MessageForm = ({ roomId }: { roomId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const chatMutation = api.chat.submit.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      ...data,
      roomId,
    };
    chatMutation.mutate(payload);
    reset();
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Textarea
          {...register("body")}
          autosize
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey === false) {
              e.preventDefault();
              formRef.current?.requestSubmit();
              return;
            }
          }}
        />
        {errors?.body && <p>{errors.body.message}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default MessageForm;
