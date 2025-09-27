import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

// Middleware
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// API routes
app.use("/api", userRoutes);

// Export the app for testing
export default app;
