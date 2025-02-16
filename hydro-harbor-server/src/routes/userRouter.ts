import express, { Router } from "express";
import { verifyJwt } from "../utils/jwtHelper";
import {
  getAllUsers,
  getUserPurchasesAndFavorites,
} from "../controllers/userController";

export const UserRouter = (): any => {
  const userRouter: Router = express.Router();

  userRouter.route("/").get(verifyJwt, getAllUsers);
  userRouter.route("/orders-and-favorites/:email").get(verifyJwt, getUserPurchasesAndFavorites);

  return userRouter;
};
