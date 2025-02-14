import { Request, Response } from "express";
import Product from "../models/Product";
import Manufacturer from "../models/Manufacturer";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      sortBy,
      sortDirection = "asc",
      manufacturer,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const sortOptions: { [key: string]: 1 | -1 } = {};
    if (sortBy === "name") {
      sortOptions.name = sortDirection === "asc" ? 1 : -1;
    } else if (sortBy === "price") {
      sortOptions.price = sortDirection === "asc" ? 1 : -1;
    } else if (sortBy === "manufacturer") {
      sortOptions.manufacturer = sortDirection === "asc" ? 1 : -1;
    }

    const filterOptions: { [key: string]: any } = {};
    if (manufacturer) {
      const manufacturerToFilterBy = await Manufacturer.findOne({
        name: manufacturer,
      });
      if (manufacturerToFilterBy) {
        filterOptions.manufacturer = manufacturerToFilterBy._id;
      } else {
        return res.status(200).json({
          result: [],
          totalProducts: 0,
          totalPages: 0,
          currentPage: page,
        });
      }
    }
    if (minPrice || maxPrice) {
      filterOptions.price = {};
      if (minPrice) {
        filterOptions.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filterOptions.price.$lte = Number(maxPrice);
      }
    }
    const pageNumber = parseInt(page as string) || 1;
    const pageLimit = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * pageLimit;

    const products = await Product.find(filterOptions)
      .populate("manufacturer")
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalProducts / pageLimit);

    const mappedProducts = products.map((item) => {
      return {
        id: item._id,
        name: item.name,
        description: item.description,
        manufacturer: item.manufacturer.name,
        imageUrl: item.imageUrl,
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
    return res.status(200).json({
      result: {
        id: product._id,
        name: product.name,
        description: product.description,
        manufacturer: product.manufacturer.name,
        imageUrl: product.imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMssg: "Internal Server Error" });
  }
};
