import mongoose from "mongoose";
import Joi from "joi";
import { Schema, Model } from "mongoose";

interface IApplication {
  notis: string;
  stage: Stage;
}

type Stage = "APPLIED" | "TECHSHIP_SCHOOL" | "TECHSHIP_PROGRAMME";

export const applicationSchema: Schema<IApplication> = new mongoose.Schema({
  notis: { type: String },
  stage: {
    type: String,
    enum: ["APPLIED", "TECHSHIP_SCHOOL", "TECHSHIP_PROGRAMME"],
    default: "TECHSHIP_SCHOOL",
  },
});

export const Application: Model<IApplication> = mongoose.model(
  "applications",
  applicationSchema
);

export function validateApplication(application: IApplication) {
  const Schema = Joi.object({
    stage: Joi.string(),
    notis: Joi.string(),
  });
  return Schema.validate(application);
}
