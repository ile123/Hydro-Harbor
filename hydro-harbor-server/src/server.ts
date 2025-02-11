import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/dotenv";
import { connectToDatabase } from "./helper";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const localhostMongoUri: string = "mongodb://localhost:27017/hydro-harbor-db";
const dockerMongoUri: string = config.DOCKER_DB_URL || "";

if(dockerMongoUri === "") {
  connectToDatabase(localhostMongoUri);
} else {
  connectToDatabase(dockerMongoUri);
}

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on PORT: ${config.PORT}`);
});