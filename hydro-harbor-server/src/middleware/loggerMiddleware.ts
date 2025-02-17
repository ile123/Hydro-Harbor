import { Request, Response, NextFunction } from 'express';

/**
 * This function logs all requests(to the server) in the console.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The NextFunction object required for middleware to work.
 */

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};