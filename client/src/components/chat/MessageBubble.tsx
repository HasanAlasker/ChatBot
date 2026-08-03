import type { Message } from "@/types/msg";
import ReactMarkdown from "react-markdown";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  return (
    <div className={`${message.isMine ? "myMsg" : "botMsg"}`}>
      <ReactMarkdown>{message.message}</ReactMarkdown>
    </div>
  );
}
