import { GoogleGenAI } from "@google/genai";
import { conversationRepo } from "../repositories/conversation.repo";
import template from "../prompts/instructions.txt";
import fs from "fs";
import path from "path";

const HasanInfo = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "Hasan.md"),
  "utf8",
);

const instructions = template.replace("{{HasanInfo}}", HasanInfo);

const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface chatResponse {
  id: string;
  message: string;
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<chatResponse> {
    const response = await aiClient.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: prompt,
      previous_interaction_id:
        conversationRepo.getLastResponseId(conversationId),
      system_instruction: instructions,
    });

    conversationRepo.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text!,
    };
  },
};
