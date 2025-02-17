import { IProduct } from "../models/IProduct";

export type MappedCartProduct = {
    product: IProduct;
    quantity: number;
}