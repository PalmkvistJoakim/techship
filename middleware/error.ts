import { Request, Response, NextFunction } from "express";

const error = (
  error: MessageEvent,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(error);
  return res.status(500).send("Internal server error, contact it support.");
};

export default error;
