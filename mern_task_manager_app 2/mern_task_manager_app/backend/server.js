import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Use environment variable for frontend base URL
const frontendBaseURL = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// CORS configuration
app.use(cors({
  origin: frontendBaseURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Route handlers
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome To Vooshfoods" });
});

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on PORT: ${PORT}`);
});
