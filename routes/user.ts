import bcrypt from "bcrypt";
import { User, validateUser } from "../models/User";
import express from "express";
import jwt from "jsonwebtoken";
import { admin } from "../middleware/admin";
import { auth } from "../middleware/auth";
import { Request, Response } from "express";

const router = express.Router();
router.get("/me", [auth, admin], async (req: Request, res: Response) => {
  const allUser = await User.find().select("-password -__v");
  res.send(allUser);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  const excitedUser = await User.findOne({ email: req.body.email });
  if (excitedUser) return res.status(400).send("User is already registerd");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const { password, ...userWithoutPass } = user.toObject();
  const token = jwt.sign(userWithoutPass, process.env.SECRET_KEY as string);

  res.status(201).header("x-auth-token", token).send(userWithoutPass);
});

export default router;
