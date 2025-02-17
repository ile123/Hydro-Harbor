import Manufactuer from "../models/Manufacturer";
import { Request, Response } from "express";

/**
 * Returns an array of manufactuers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of manufactuers.
 */

export const getAllManufacturers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const manufactuers = await Manufactuer.find({});
    if (manufactuers.length === 0) {
      return res
        .status(500)
        .send({ errorMssg: "No manufactuers have been found." });
    }
    const mappedManufactuers = manufactuers.map((item) => {
      return {
        id: item._id,
        name: item.name,
      };
    });
    return res.status(200).json({ result: mappedManufactuers });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).send({ errorMssg: error.message });
    } else {
      return res.status(500).send({ errorMssg: "Internal Server Error" });
    }
  }
};
