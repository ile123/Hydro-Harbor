import mongoose, { Model } from "mongoose";
import { IManufacturer } from "../types/models/IManufacturer";

const manufacturerSchema = new mongoose.Schema<IManufacturer>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Manufacturer: Model<IManufacturer> = mongoose.model<IManufacturer>(
  "Manufacturer",
  manufacturerSchema,
  "manufacturers"
);

export default Manufacturer;
