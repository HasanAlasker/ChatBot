import ChatInput from "@/components/chat/ChatInput";
import LoadingIndicator from "@/components/chat/LoadingIndicator";
import MessageBubble from "@/components/chat/MessageBubble";
import type { Message } from "@/types/msg";
import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [msgs, loading]);

  const renderMsgs = () => {
    return msgs?.map((m) => <MessageBubble message={m} />);
  };

  return (
    <>
      <div className="flex flex-col gap-5">{renderMsgs()}</div>
      {loading && <LoadingIndicator />}
      <div ref={bottomRef} />
      <ChatInput setMsgs={setMsgs} setLoading={setLoading} loading={loading} />
    </>
  );
}
