// src/server.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import config from "./config";
import passport from "./config/passport";
import authRoutes from "./routes/authRoutes";

connectDB();

const app = express();
const port = config.PORT;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Mount routes
app.use("/v1/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Kochi Guru Pizza Backend is running");
});

// Export the app for Vercel
export default app;

// Only start the server locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
