import express, { Router } from "express";
import { verifyJwt } from "../utils/jwtHelper";
import {
  getAllProducts,
  getProductById,
} from "../controllers/productController";

export const ProductRouter = (): any => {
  const productRouter: Router = express.Router();

  productRouter.route("/").get(verifyJwt, getAllProducts);
  productRouter.route("/:id").get(verifyJwt, getProductById);

  return productRouter;
};
