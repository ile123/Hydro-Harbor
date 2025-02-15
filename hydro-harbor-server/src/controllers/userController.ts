import User from "../models/User";
import { extractEmail } from "../utils/jwtHelper";
import { Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const users = await User.find({});
  if(users.length === 0) {
    return res.status(404).json({ errorMssg: "No users were found in the db." })
  }
  const mappedUsers = users.map((item) => {
    return {
      id: item._id,
      fullName: item.fullName,
      email: item.email
    }
  });
  return res.status(200).json({ result: mappedUsers });
};

//finish later
export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errorMssg: "Product id was not provided." });
    }
    const product = await User.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ errorMssg: `Product with id ${id} not found.` });
    }

    return res.status(200).json({
      result: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};

export const getUserByToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authorization = req.header("authorization");
    const userEmail = extractEmail(authorization, res);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(400)
        .send({ errorMssg: `User with email ${userEmail} not found.` });
    }
    return user;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).send({ errorMssg: error.message });
    } else {
      return res.status(500).send({ errorMssg: "Internal Server Error" });
    }
  }
};
