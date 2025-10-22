import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./presentation/routes/user.route";
import { AppDataSource } from "./infrastructure/database/data-source";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/users", userRoutes);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

export default app;
