import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatInput from "./components/chat/ChatInput";
import { BeatLoader } from "react-spinners";
import type { Message } from "./types/msg";
import ReactMarkdown from "react-markdown";
import { RandomPhrase } from "./constants/loadingPhrases";

function App() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [msgs, loading]);

  const renderMsgs = () => {
    return msgs?.map((m) => (
      <div key={m.id} className={`${m.isMine ? "myMsg" : "botMsg"}`}>
        <ReactMarkdown>{m.message}</ReactMarkdown>
      </div>
    ));
  };

  return (
    <div className="Screen">
      <div className="flex flex-col gap-5">{renderMsgs()}</div>
      {loading && (
        <div className="flex gap-2 items-center mt-5 loadingMsg">
          {RandomPhrase()} <BeatLoader size={7} />
        </div>
      )}
      <div ref={bottomRef} />
      <ChatInput setMsgs={setMsgs} setLoading={setLoading} loading={loading} />
    </div>
  );
}

export default App;
