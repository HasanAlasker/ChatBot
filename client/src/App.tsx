import { useState } from "react";
import "./App.css";
import ChatInput from "./components/chat/ChatInput";
import { BeatLoader } from "react-spinners";
import type { Message } from "./types/msg";

function App() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const renderMsgs = () => {
    return msgs?.map((m) => (
      <div key={m.id} className={`${m.isMine ? "myMsg" : "botMsg"}`}>
        {m.message}
      </div>
    ));
  };

  return (
    <div className="Screen">
      <div className="flex flex-col gap-5">{renderMsgs()}</div>
      {loading && (
        <div className="flex gap-2 items-center mt-5 msg">
          Thinking <BeatLoader size={7} />
        </div>
      )}
      <ChatInput setMsgs={setMsgs} setLoading={setLoading} />
    </div>
  );
}

export default App;
