import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/dotenv";
import { connectToDatabase } from "../utils/dbHelper";

/**
 * This function checks if the server is connected to the db, if its not then it will try to connect again.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The NextFunction object required for middleware to work.
 */

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
