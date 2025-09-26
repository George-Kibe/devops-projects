import express from "express";
import logger from "#config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "#routes/auth.routes.js";
import { securityMiddleware } from "#middlewares/security.middleware.js";

// console.log("Database URL: ", process.env.DATABASE_URL);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim())}}));
app.use(securityMiddleware);

app.get("/", (req, res) => {
  logger.info("Hello from the Acquisitions API");
  res.json({
    message: "hello from a container: Acquisitions API",
    service: "hello Node",
    pod: process.env.POD_NAME || "Not specified",
    time: new Date().toISOString(),
  });
});

app.get("/ready", (req, res) => {
  res.status(200).json({
    message: "Application is ready, up and running",
    service: "hello Node",
    status: 200,
    pod: process.env.POD_NAME || "Not specified",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Application health status is OKAY",
    status: 200,
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes );
export default app;
