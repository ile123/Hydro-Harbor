import express, { Router } from "express";
import { login, register } from "../controllers/authenticationController";

export const AuthenticationRouter = (): any => {
  const authenticationRouter: Router = express.Router();

  authenticationRouter
    .route("/login")
    .post(login);

  authenticationRouter
    .route("/register")
    .post(register);

  return authenticationRouter;
};
