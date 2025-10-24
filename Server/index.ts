import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./presentation/routes/user.route";
import projectRoutes from "./presentation/routes/project.route";
import { AppDataSource } from "./infrastructure/database/data-source";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Apply helmet to all routes EXCEPT /uploads
app.use((req, res, next) => {
  if (req.path.startsWith('/uploads')) {
    return next();
  }
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:"],
        fontSrc: ["'self'", "data:"],
        frameSrc: ["'self'", "blob:"],
        objectSrc: ["'self'"],
      },
    },
  })(req, res, next);
});
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files with proper headers for embedding
app.use("/uploads", (req, res, next) => {
  // Remove any CSP headers
  res.removeHeader("Content-Security-Policy");
  res.removeHeader("X-Content-Security-Policy");

  // Set headers to allow embedding
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Frame-Options", "ALLOWALL");

  // For PDFs specifically
  if (req.path.endsWith('.pdf')) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
  }

  next();
}, express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

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
