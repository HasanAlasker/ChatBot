import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import chat from "./routes/chat.route";

dotenv.config();

const app = express();
app.use(json());
app.use("/api/chat", chat);

const port = process.env.PORT ?? "4000";
app.use(cors({ origin: "*" }));

app.listen(port, () => {
  console.log(`Server running on ${port} 🌍`);
  console.log(`Accessible at http://localhost:${port} 🖥️`);
});
