import { Request, Response } from "express";
import Product from "../models/Product";
import { getUserByToken } from "./userController";
import { IUser } from "../types/models/IUser";
import { parseProductQueryParameters } from "../utils/queryHelper";
import { IFavorite } from "../types/models/IFavorite";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { sortOptions, filterOptions, pageNumber, pageLimit, skip } =
      await parseProductQueryParameters(req.query);
    if (filterOptions.manufacturer === null) {
      return res.status(200).json({
        result: [],
        totalProducts: 0,
        totalPages: 0,
        currentPage: pageNumber,
      });
    }

    const products = await Product.find(filterOptions)
      .populate("manufacturer")
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalProducts / pageLimit);

    const user = await getUserByToken(req, res);

    const mappedProducts = products.map((item) => {
      const isFavorite = user.favorites.some((favorite: IFavorite) => {
        return favorite.product.toString() === item._id.toString();
      });

      return {
        id: item._id,
        name: item.name,
        description: item.description,
        manufacturer: item.manufacturer.name,
        price: item.price,
        imageUrl: item.imageUrl,
        isFavorite: isFavorite,
      };
    });

    return res.status(200).json({
      result: mappedProducts,
      totalProducts,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};

export const getProductById = async (
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
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ errorMssg: `Product with id ${id} not found.` });
    }
    const user: IUser = await getUserByToken(req, res);
    const isFavorite = user.favorites.some((favorite) => {
      return favorite.product.toString() === id;
    });
    return res.status(200).json({
      result: {
        id: product._id,
        name: product.name,
        description: product.description,
        manufacturer: product.manufacturer.name,
        price: product.price,
        imageUrl: product.imageUrl,
        isFavorite: isFavorite,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};

export const addProductToFavorite = async (
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
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ errorMssg: `Product with id ${id} not found.` });
    }
    const user: IUser = await getUserByToken(req, res);
    if (!user) {
      return res.status(400).json({ errorMssg: "User not found." });
    }

    const isFavorite = user.favorites.some((favorite) => {
      return favorite.product.toString() === id;
    });

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (item) => item.product.toString() !== id
      );
    } else {
      user.favorites.push({
        product: product._id,
        dateAddedToFavorites: new Date(),
      });
    }
    //@ts-expect-error IUser type dose not encompase the Document, so this will keep giving the error.
    await user.save();

    return res.status(200).json({
      result: !isFavorite
        ? "Product added to your favorites."
        : "Product removed from your favorites.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};
