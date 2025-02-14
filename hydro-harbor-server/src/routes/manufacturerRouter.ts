import express, { Router } from "express";
import { getAllManufacturers } from "../controllers/manufacturerController";
import { verifyJwt } from "../utils/jwtHelper";

export const ManufacturerRouter = (): any => {
  const manufacturerRouter: Router = express.Router();

  manufacturerRouter.route("/").get(verifyJwt, getAllManufacturers);

  return manufacturerRouter;
};
