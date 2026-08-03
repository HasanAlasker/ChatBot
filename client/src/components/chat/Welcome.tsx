import { sendPrompt } from "@/functions/sendPrompt";
import type { Message } from "@/types/msg";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  setMsgs: Dispatch<SetStateAction<Message[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  conversationId: string;
}

export default function Welcome({
  setMsgs,
  setLoading,
  conversationId,
}: Props) {
  return (
    <div className="m-auto flex max-w-xl flex-col items-center gap-12 px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Hasan Alasker's Portfolio Assistant
        </h1>
        <p className="text-md leading-relaxed text-zinc-500">
          Ask me about Hasan's projects, experience, or skills - I'll answer
          based on his portfolio.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {[
          "What projects has Hasan built?",
          "What's his tech stack?",
          "How can I get in touch?",
          "Where can I find his projects?",
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={async () =>
              await sendPrompt(prompt, setMsgs, setLoading, conversationId)
            }
            className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-sm md:text-md text-zinc-600 transition-colors hover:border-gray-300 hover:bg-black hover:text-white"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
