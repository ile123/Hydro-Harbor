import express, { Router } from "express";
import { verifyJwt } from "../utils/jwtHelper";
import {
  addProductToFavorite,
  getAllProducts,
  getProductById,
  getProductsByOrder,
  purchaseProducts,
} from "../controllers/productController";

export const ProductRouter = (): any => {
  const productRouter: Router = express.Router();

  productRouter.route("/").get(verifyJwt, getAllProducts);
  productRouter.route("/:id").get(verifyJwt, getProductById);
  productRouter.route("/order/:id").get(verifyJwt, getProductsByOrder);
  productRouter
    .route("/add-to-favorites/:id")
    .patch(verifyJwt, addProductToFavorite);
  productRouter.route("/purchase").post(verifyJwt, purchaseProducts);

  return productRouter;
};
