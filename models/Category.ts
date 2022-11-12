import mongoose from "mongoose";
import { Schema, Model } from "mongoose";
import Joi, { string } from "joi";

interface ICateory {
  name: string;
}

export const categoySchema: Schema<ICateory> = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category: Model<ICateory> = mongoose.model(
  "categories",
  categoySchema
);

export function validateCategory(category: ICateory) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(category);
}
