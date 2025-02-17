import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/dotenv";

/**
 * This function creates and signs a jwt token using the users email.
 * @param {String} user_email - The user email.
 * @returns {String} A signed jwt used for future request verification.
 */

export const signJwt = (user_email: string): string => {
  const expirationTime = "1h";
  if (!config.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in config");
  }
  try {
    return jwt.sign({ sub: user_email }, config.JWT_SECRET, {
      expiresIn: expirationTime,
    });
  } catch (error) {
    console.error("Error signing JWT:", error);
    throw new Error("Failed to sign JWT");
  }
};

/**
 * This is a middleware function that verifies the jwt token on each request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The NextFunction object required for middleware to work.
 */

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({ errorMssg: "Missing or invalid bearer token" });
    return;
  }

  const token = authorization.split("Bearer ")[1];

  if (!token) {
    res.status(401).send({ errorMssg: "Missing token" });
    return;
  }

  jwt.verify(token, config.JWT_SECRET || "", (err, payload) => {
    if (err || !payload || typeof payload !== "object" || !("sub" in payload)) {
      res.status(401).send({ errorMssg: "Unauthorized" });
      return;
    }
    (req as any).user = payload;
    next();
  });
};

/**
 * This function extracts the users email from the jwt token.
 * @param {String} authHeader - The authentication header from the request.
 * @returns {String} Users email.
 */

export const extractEmail = (
  authHeader: string | undefined,
  res: Response
): string | Response => {
  if (!authHeader) {
    return res
      .status(401)
      .send({ errorMssg: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ errorMssg: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET || "") as JwtPayload;
    return decoded.sub as string;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return res.status(401).send({ errorMssg: "Invalid or expired token" });
  }
};
