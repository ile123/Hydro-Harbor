import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/dotenv";
import { connectToDatabase } from "../utils/dbHelper";

export const ensureDbConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("Database connection lost. Attempting to reconnect...");
    try {
      await connectToDatabase(config.DB_URL);
      console.log("Database reconnected successfully.");
    } catch (error) {
      console.error("Database reconnection failed:", error);
    }
  }
  next();
};
