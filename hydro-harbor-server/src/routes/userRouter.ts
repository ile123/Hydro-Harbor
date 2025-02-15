import express, { Router } from "express";
import { verifyJwt } from "../utils/jwtHelper";
import { getAllUsers, getUserById } from "../controllers/userController";

export const UserRouter = (): any => {
  const userRouter: Router = express.Router();

  userRouter.route("/").get(verifyJwt, getAllUsers);
  userRouter.route("/:id").get(verifyJwt, getUserById);

  return userRouter;
};