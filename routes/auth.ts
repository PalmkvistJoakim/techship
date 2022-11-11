import { User } from "../models/User";
import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  const { password, ...userWithoutPass } = user.toObject();

  const token = jwt.sign(userWithoutPass, process.env.SECRET_KEY as string);
  res.send(token);
});

interface IAuth {
  email: string;
  password: string;
}

function validateAuth(user: IAuth) {
  const Schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(user);
}

export default router;
