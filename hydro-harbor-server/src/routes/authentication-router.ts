import express, { Request, Response, Router } from "express";
import { signJwt } from "../utils/jwt-helper";
import User from "../models/User";
import bcrypt from "bcrypt";

export const AuthenticationRouter = (): any => {
  const authenticationRouter: Router = express.Router();

  authenticationRouter
    .route("/login")
    .post(async (req: Request, res: Response): Promise<any> => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).send("Email and password are required.");
        }

        const user = await User.findOne({ email }).exec();
        if (!user) {
          return res.status(400).send({
            errorMssg: "User with given email does not exist!",
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(400).send({ errorMssg: "Wrong password" });
        }

        const token = signJwt(user.email);
        res.status(200).json({ token: token });
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          res.status(500).send({ errorMssg: error.message });
        } else {
          res.status(500).send({ errorMssg: "Internal Server Error" });
        }
      }
    });

  authenticationRouter
    .route("/register")
    .post(async (req: Request, res: Response): Promise<any> => {
      try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
          return res
            .status(400)
            .send({ errorMssg: "All fields are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: any = new User({
          fullName,
          password: hashedPassword,
          email,
        });

        await newUser.save();
        return res.status(201).json(newUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          return res.status(500).send({
            errorMssg: error.message,
          });
        } else {
          console.error(error);
          return res.status(500).send({
            errorMssg: "An unknown error occurred.",
          });
        }
      }
    });

  return authenticationRouter;
};
