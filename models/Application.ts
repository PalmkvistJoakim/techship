import mongoose from "mongoose";
import Joi from "joi";
import { Schema, Model } from "mongoose";

interface IApplication {
  image?: string;
  notis: string;
  name: string;
  email: string;
  age: number;
  address: string;
  phone?: string;
  stage: Stage;
  description: string;
}

type Stage = "APPLIED" | "TECHSHIP_SCHOOL" | "TECHSHIP_PROGRAMME";

export const applicationSchema: Schema<IApplication> = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://drive.google.com/file/d/1_qBj8AbR3t61wiN601-KhbSeu1F4omqi/view?usp=sharing",
  },
  notis: { type: String },
  name: { type: String, minlength: 2, required: true },
  email: { type: String, required: true },
  age: { type: Number, minlength: 18, maxlength: 25, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  stage: {
    type: String,
    enum: ["APPLIED", "TECHSHIP_SCHOOL", "TECHSHIP_PROGRAMME"],
    default: "TECHSHIP_SCHOOL",
  },
  description: { type: String },
});

export const Application: Model<IApplication> = mongoose.model(
  "applications",
  applicationSchema
);

export function validateApplication(application: IApplication) {
  const Schema = Joi.object({
    image: Joi.string(),
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
    age: Joi.number().min(18).max(25).required(),
    address: Joi.string().required(),
    phone: Joi.string(),
    description: Joi.string(),
    takenProgram: Joi.boolean().default(false),
    takenSchool: Joi.string().default(false),
    notis: Joi.string(),
  });
  return Schema.validate(application);
}
