import mongoose from "mongoose";
import Joi from "joi";
import { Schema, Model } from "mongoose";
import { categoySchema } from "./Category";

interface IApplication {
  contact_id: string;
  kommentar: object;
  categoryId: typeof categoySchema;
}

export const applicationSchema: Schema<IApplication> = new mongoose.Schema(
  {
    contact_id: { type: String },
    kommentar: { type: String },
    categoryId: categoySchema,
  },
  { timestamps: true }
);

export const Application: Model<IApplication> = mongoose.model(
  "applications",
  applicationSchema
);

export function validateApplication(application: IApplication) {
  const Schema = Joi.object({
    contact_id: Joi.string(),
    kommentar: Joi.string(),
    categoryId: Joi.string(),
  });
  return Schema.validate(application);
}
