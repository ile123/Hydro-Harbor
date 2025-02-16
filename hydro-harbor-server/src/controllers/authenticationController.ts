import { Request, Response } from "express";
import { signJwt } from "../utils/jwtHelper";
import User from "../models/User";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response): Promise<any> => {
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
    return res.status(200).json({ token: token, fullName: user.fullName, email: user.email });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).send({ errorMssg: error.message });
    } else {
      return res.status(500).send({ errorMssg: "Internal Server Error" });
    }
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).send({ errorMssg: "All fields are required." });
    }

    const user = await User.findOne({ email }).exec();
    if (user) {
      return res.status(400).send({
        errorMssg: "User with given email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: any = new User({
      fullName,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    return res.status(201).json({ result: newUser });
  } catch (error) {
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
};
