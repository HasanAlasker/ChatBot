import { useState } from "react";
import "./App.css";
import ChatInput from "./components/chat/ChatInput";
import { BeatLoader } from "react-spinners";

function App() {
  const [msgs, setMsgs] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const renderMsgs = () => {
    return msgs?.map((m) => <li key={m}>{m}</li>);
  };

  return (
    <div className="Screen">
      <ul>{renderMsgs()}</ul>
      {loading && (
        <div className="flex gap-2 items-center rounded-r-full rounded-tl-full bg-primary-foreground w-fit p-3 border border-chart-2">
          Thinking <BeatLoader size={7} />
        </div>
      )}
      <ChatInput setMsgs={setMsgs} setLoading={setLoading} />
    </div>
  );
}

export default App;
