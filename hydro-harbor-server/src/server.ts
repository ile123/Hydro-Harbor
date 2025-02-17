import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/dotenv";
import { startDb } from "./utils/dbHelper";
import { AuthenticationRouter } from "./routes/authenticationRouter";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { ProductRouter } from "./routes/productRouter";
import { ManufacturerRouter } from "./routes/manufacturerRouter";
import { ensureDbConnection } from "./middleware/dbConnectionMiddleware";
import { UserRouter } from "./routes/userRouter";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware)
app.use(ensureDbConnection);

app.use("/api/auth", AuthenticationRouter());
app.use("/api/manufacturers", ManufacturerRouter());
app.use("/api/products", ProductRouter());
app.use("/api/users", UserRouter());

startDb(config.DB_URL);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.listen(5000, () => {
  console.log(`Server is running on PORT: ${5000}`);
});
