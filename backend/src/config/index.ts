// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  MONGO_DB_URI,
  FRONTEND_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  NODE_ENV
} = process.env;

// Validate required environment variables
const requiredEnvVars = [
  "MONGO_DB_URI",
  "FRONTEND_URL",
  "JWT_SECRET",
  "REFRESH_TOKEN_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL"
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

interface Config {
  PORT: number;
  MONGO_DB_URI: string;
  FRONTEND_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  MAX_ACTIVE_SESSIONS: number;
  NODE_ENV: string;
}

const config: Config = {
  PORT: PORT ? Number(PORT) : 5000,
  MONGO_DB_URI: MONGO_DB_URI as string,
  FRONTEND_URL: FRONTEND_URL as string,
  JWT_SECRET: JWT_SECRET as string,
  JWT_EXPIRES_IN: JWT_EXPIRES_IN || "1d",
  REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET as string,
  REFRESH_TOKEN_EXPIRES_IN: REFRESH_TOKEN_EXPIRES_IN || "30d",
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET as string,
  GOOGLE_CALLBACK_URL: GOOGLE_CALLBACK_URL as string,
  MAX_ACTIVE_SESSIONS: Number(process.env.MAX_ACTIVE_SESSIONS) || 5,
  NODE_ENV: NODE_ENV || "production"
};

export default config;
