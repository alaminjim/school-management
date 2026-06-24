import { NextFunction, Request, Response } from "express";

export const validateCourse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, thumbnail, price, categoryId } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "title required" });
  }

  if (!thumbnail || typeof thumbnail !== "string") {
    return res.status(400).json({ message: "thumbnail required" });
  }

  if (price === undefined || isNaN(Number(price))) {
    return res.status(400).json({ message: "valid price required" });
  }

  if (!categoryId || typeof categoryId !== "string") {
    return res.status(400).json({ message: "categoryId required" });
  }

  return next();
};