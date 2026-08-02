import { Button } from "@/components/ui/button";
import type { LLMresponse } from "@/types/LLM";
import type { Message } from "@/types/msg";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Notification from "../../assets/sounds/notification.mp3";
import Pop from "../../assets/sounds/pop.mp3";

const popSound = new Audio(Pop);
popSound.volume = 0.2;
const notificationSound = new Audio(Notification);
notificationSound.volume = 0.2;

interface FormProps {
  prompt: string;
}
interface Props {
  setMsgs: Dispatch<SetStateAction<Message[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export default function ChatInput({ setMsgs, setLoading, loading }: Props) {
  const conversationId = useRef(crypto.randomUUID());

  const { register, handleSubmit, reset, formState } = useForm<FormProps>();

  const onSubmit = async ({ prompt }: FormProps) => {
    setLoading(true);
    reset();
    try {
      setMsgs((prev) => [
        ...prev,
        { isMine: true, id: crypto.randomUUID(), message: prompt },
      ]);
      popSound.play();
      const { data } = await axios.post<LLMresponse>("/api/chat", {
        prompt,
        conversationId,
      });
      setMsgs((prev) => [
        ...prev,
        { id: crypto.randomUUID(), message: data.response },
      ]);
      notificationSound.play();
    } catch (error) {
      setLoading(false);
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
