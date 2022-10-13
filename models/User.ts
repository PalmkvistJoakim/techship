import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Schema, Model, Document, Types } from "mongoose";
import Joi from "joi";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, minlength: 2 },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
});

export const User: Model<IUser> = mongoose.model("users", userSchema);

export function validateUser(user: IUser) {
  const Schema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(user);
}
