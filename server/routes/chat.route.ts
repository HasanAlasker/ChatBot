import express, { type Request, type Response } from "express";
import { chatController } from "../controller/chat.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello Hasan Alasker");
});

router.post("/", chatController.sendMessage);

export default router;
