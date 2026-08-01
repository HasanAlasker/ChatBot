import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  prompt: string;
}

interface Props {
  setMsgs: Dispatch<SetStateAction<string[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface LLMresponse {
  response: string;
}

export default function ChatInput({ setMsgs, setLoading }: Props) {
  const conversationId = useRef(crypto.randomUUID);

  const { register, handleSubmit, reset, formState } = useForm<FormProps>();

  const onSubmit = async ({ prompt }: FormProps) => {
    setLoading(true);
    reset();
    try {
      setMsgs((prev) => [...(prev ?? []), prompt]);
      const { data } = await axios.post<LLMresponse>("/api/chat", {
        prompt,
        conversationId,
      });
      setMsgs((prev) => [...(prev ?? []), data.response]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="flex items-center border-2 border-gray-500 rounded-full px-2 fixed bottom-0 left-0 right-0 m-10 h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        onKeyDown={onKeyDown}
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        placeholder="Ask Anything..."
        maxLength={1000}
        className="resize-none text-lg outline-0 flex flex-1 items-center justify-center pt-6 pl-4"
      />
      <Button
        type="submit"
        disabled={!formState.isValid}
        className="rounded-full aspect-square h-15"
      >
        <ArrowUp className="size-7!" />
      </Button>
    </form>
  );
}
