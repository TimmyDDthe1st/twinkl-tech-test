import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRoutes);

export default app;
