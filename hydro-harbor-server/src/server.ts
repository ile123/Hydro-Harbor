import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/dotenv";
import { connectToDatabase } from "./utils/db-helper";
import { AuthenticationRouter } from "./routes/authentication-router";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthenticationRouter());

connectToDatabase(config.DB_URL);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on PORT: ${config.PORT}`);
});