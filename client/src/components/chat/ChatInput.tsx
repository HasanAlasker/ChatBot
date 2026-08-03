import { Button } from "@/components/ui/button";
import { sendPrompt } from "@/functions/sendPrompt";
import type { Message } from "@/types/msg";
import { ArrowUp } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction
} from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  prompt: string;
}
interface Props {
  setMsgs: Dispatch<SetStateAction<Message[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  conversationId: string;
}

export default function ChatInput({
  setMsgs,
  setLoading,
  loading,
  conversationId,
}: Props) {
  const { register, handleSubmit, reset, formState } = useForm<FormProps>();

  const onSubmit = async ({ prompt }: FormProps) => {
    reset();
    await sendPrompt(prompt, setMsgs, setLoading, conversationId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="flex items-center border-2 bg-white/20 border-gray-300 rounded-full px-2 fixed bottom-0 left-0 right-0 mb-4 mx-4 md:mx-40 h-fit backdrop-blur-sm shadow-md shadow-black/10"
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
        className="resize-none text-md outline-0 flex flex-1 items-center justify-center pt-6 pl-4"
      />
      <Button
        type="submit"
        disabled={!formState.isValid || loading}
        className="rounded-full aspect-square h-14"
      >
        <ArrowUp className="size-6!" />
      </Button>
    </form>
  );
}
