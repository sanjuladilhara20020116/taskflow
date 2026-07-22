import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

// Add common security headers.
app.use(helmet());

// Allow requests from the React application.
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON request bodies.
app.use(express.json({ limit: "1mb" }));

// Parse URL encoded request bodies.
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// Simple API health route.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;