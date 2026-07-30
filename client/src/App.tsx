import { useEffect, useState } from "react";
import "./App.css";

import { Button } from "@/components/ui/button";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);
  return (
    <>
      <h1>{msg ?? "loading..."}</h1>
      <Button>Hello ShadCn</Button>
    </>
  );
}

export default App;
