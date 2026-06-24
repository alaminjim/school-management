/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateSchema = (
  schema: ZodObject<any>,
  options: { source?: "body" | "query" | "params" } = { source: "body" },
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const source = options.source || "body";
      const result = await schema.parseAsync(req[source]);
      // Replace the source with parsed/validated value
      (req as any)[source] = result;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
