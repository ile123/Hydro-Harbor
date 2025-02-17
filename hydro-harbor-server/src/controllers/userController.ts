import Product from "../models/Product";
import Purchase from "../models/Purchase";
import User from "../models/User";
import { extractEmail } from "../utils/jwtHelper";
import { Request, Response } from "express";

/**
 * Return an array of users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of users.
 */

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const users = await User.find({});
  if (users.length === 0) {
    return res
      .status(404)
      .json({ errorMssg: "No users were found in the db." });
  }
  const mappedUsers = users.map((item) => {
    return {
      id: item._id,
      fullName: item.fullName,
      email: item.email,
    };
  });
  return res.status(200).json({ result: mappedUsers });
};

/**
 * Based on a given user email, return the users orders and favorites.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of users orders and favorites.
 */

export const getUserPurchasesAndFavorites = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ errorMssg: "User email was not provided." });
    }
    const user = await User.findOne({ email: email })
      .populate("purchases")
      .populate("favorites");
    if (!user) {
      return res
        .status(400)
        .json({ errorMssg: `User with email ${email} not found.` });
    }

    const allPurchases = (await Purchase.find({ user: user })).map((item) => {
      return {
        id: item._id,
        purchaseDate: item.purchaseDate,
      };
    });

    const allFavorites = await Promise.all(
      user.favorites.map(async (item) => {
        const product = await Product.findById(item.product._id);
        return {
          id: product?._id,
          imageUrl: product?.imageUrl,
          name: product?.name,
          dateAddedToFavorites: item.dateAddedToFavorites,
        };
      })
    );

    return res.status(200).json({
      result: {
        purchases: allPurchases,
        favorites: allFavorites,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};

/**
 * Given a jwt token, return a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user document.
 */

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
