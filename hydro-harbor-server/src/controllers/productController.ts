import { Request, Response } from "express";
import Product from "../models/Product";
import { getUserByToken } from "./userController";
import { IUser } from "../types/models/IUser";
import { parseProductQueryParameters } from "../utils/queryHelper";
import { IFavorite } from "../types/models/IFavorite";
import { CartProduct } from "../types/product/CartProduct";
import Purchase from "../models/Purchase";
import { MappedCartProduct } from "../types/product/MappedCartProduct";

/**
 * Return an array of products based on the query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of products.
 */

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

/**
 * Return a product based on the given id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The product with the given id.
 */

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

/**
 * Return an product based on the given order id. This is used for getting all of the products from a order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of products from a order.
 */

export const getProductsByOrder = async (
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
    const order = await Purchase.findById(id).populate("products");
    if (!order) {
      return res
        .status(400)
        .json({ errorMssg: `Product with id ${id} not found.` });
    }
    const mappedProducts = await Promise.all(
      order?.products.map(async (item) => {
        const product = await Product.findById(item.product).exec();
        return {
          id: product?._id,
          name: product?.name,
          price: product?.price,
          quantity: item.quantity,
          imageUrl: product?.imageUrl,
        };
      })
    );

    return res.status(200).json({
      result: mappedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};

/**
 * Adds a product to the users favorite collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {String} The string that indicates if the product was added/removed from favorites.
 */

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

/**
 * This function receives a list of products and processes the purchase.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @example
 * // Example usage:
 * // The body of the request would contain a list of products (with ids and quantities):
 * // {
 * //   "products": [
 * //     { "id": "ObjectId-1", "quantity": 2 },
 * //     { "id": "ObjectId-2", "quantity": 1 }
 * //   ]
 * // }
 * @returns {String} The string that indicates if the products were purchased.
 */

export const purchaseProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { products } = req.body;
    const productIds = products.map((item: CartProduct) => item.id);

    const foundProducts = await Product.find({
      _id: { $in: productIds },
    }).exec();
    if (foundProducts.length !== productIds.length) {
      return res.status(500).json({
        errorMssg: "Some products with given ids could not be found.",
      });
    }

    const user = await getUserByToken(req, res);
    if (!user) {
      return res.status(400).json({ errorMssg: "User not found." });
    }

    const purchasedProducts = products.map(
      (product: CartProduct, index: number) => ({
        quantity: product.quantity,
        product: foundProducts[index],
      })
    );

    const totalAmount = purchasedProducts.reduce(
      (sum: number, item: MappedCartProduct) =>
        sum + item.product.price * item.quantity,
      0
    );

    const newPurchase = new Purchase({
      user,
      products: purchasedProducts,
      totalAmount: totalAmount,
      purchaseDate: Date.now()
    });
    user.purchases.push(newPurchase);
    await newPurchase.save();
    await user.save();

    return res.status(200).json({ result: "Products have been bought." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};
