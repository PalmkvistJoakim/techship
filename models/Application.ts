import mongoose from "mongoose";
import Joi from "joi";
import { Schema, Model } from "mongoose";

interface IApplication {
  contact_id: string;
  kommentar: object;
  stage: Stage;
}

type Stage = "APPLIED" | "TECHSHIP_SCHOOL" | "TECHSHIP_PROGRAMME";

export const applicationSchema: Schema<IApplication> = new mongoose.Schema({
  contact_id: { type: String },
  kommentar: new Schema({ text: { type: String } }, { timestamps: true }),
  stage: {
    type: String,
    enum: ["APPLIED", "TECHSHIP_SCHOOL", "TECHSHIP_PROGRAMME"],
    default: "APPLIED",
  },
});

export const Application: Model<IApplication> = mongoose.model(
  "applications",
  applicationSchema
);

export function validateApplication(application: IApplication) {
  const Schema = Joi.object({
    contact_id: Joi.string(),
    kommentar: Joi.object(),
    stage: Joi.string(),
  });
  return Schema.validate(application);
}
