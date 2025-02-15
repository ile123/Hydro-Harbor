import express, { Router } from "express";
import { verifyJwt } from "../utils/jwtHelper";
import {
  addProductToFavorite,
  getAllProducts,
  getProductById,
} from "../controllers/productController";

export const ProductRouter = (): any => {
  const productRouter: Router = express.Router();

  productRouter.route("/").get(verifyJwt, getAllProducts);
  productRouter.route("/:id").get(verifyJwt, getProductById);
  productRouter
    .route("/add-to-favorites/:id")
    .patch(verifyJwt, addProductToFavorite);

  return productRouter;
};
