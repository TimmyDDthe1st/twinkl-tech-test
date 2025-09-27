import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

app.use(express.json());

app.get("/", (res: Response) => {
  res.send(`
    <h1>Twinkl User API</h1>
    <p>Welcome to the Twinkl User Management API</p>
    <ul>
      <li><a href="/api-docs">📚 API Documentation (Swagger UI)</a></li>
    </ul>
  `);
});

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Twinkl User API Documentation",
  })
);

app.use("/api", userRoutes);

export default app;
