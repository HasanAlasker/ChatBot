import type { Request, Response } from "express";
import { chatService } from "../services/chat.service";

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);

      return res.json({ success: true, response: response.message });
    } catch (error) {
      return res.status(500).json({ message: "server error", error });
    }
  },
};
