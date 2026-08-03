import type { LLMresponse } from "@/types/LLM";
import type { Message } from "@/types/msg";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import Notification from "../assets/sounds/notification.mp3";
import Pop from "../assets/sounds/pop.mp3";

const popSound = new Audio(Pop);
popSound.volume = 0.2;
const notificationSound = new Audio(Notification);
notificationSound.volume = 0.2;

export const sendPrompt = async (
  prompt: string,
  setMsgs: Dispatch<SetStateAction<Message[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  conversationId: string,
) => {
  setLoading(true);
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
