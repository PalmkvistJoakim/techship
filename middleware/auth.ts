import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request | any, res: Response, next: NextFunction) => {
  const token = req.headers["x-auth-token"] as string;
  if (!token) return res.status(401).send("Unauthenticed");

  try {
    const user = jwt.decode(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
