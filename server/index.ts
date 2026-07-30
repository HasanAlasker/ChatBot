import express, { json, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();

const port = process.env.PORT ?? "4000";

app.use(cors({ origin: "*" }));

app.use(json());
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Hasan Alasker");
});

app.get("/api/hello", async (req: Request, res: Response) => {
  res.json({ message: "Hello world" }).status(200);
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await aiClient.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
      
    });

    return res.json({ success: true, response: response.output_text });
  } catch (error) {
    return res.json({ message: "server error", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port} 🌍`);
  console.log(`Accessible at http://localhost:${port} 🖥️`);
});
