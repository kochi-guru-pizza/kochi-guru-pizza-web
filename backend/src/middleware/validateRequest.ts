// src/middleware/validateRequest.ts
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateRequest =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })) as any;

      req.body = parsed.body || req.body;
      req.query = parsed.query || req.query;
      req.params = parsed.params || req.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((e) => ({
            field: e.path.slice(1).join("."),
            message: e.message
          }))
        });
      }
      next(error);
    }
  };
