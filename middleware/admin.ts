import { Request, Response, NextFunction } from "express";

export const admin = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};
