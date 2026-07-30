import express, { json, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();
const app = express();

const port = process.env.PORT ?? "4000";

app.use(cors({origin: "*"}))

app.use(json());
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Hasan Alasker");
});

app.get("/api/hello", async (req: Request, res: Response) => {
  res.json({ message: "Hello world" }).status(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port} 🌍`);
  console.log(`Accessible at http://localhost:${port} 🖥️`);
});
