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
      })) as { body?: unknown; query?: unknown; params?: unknown };

      if (parsed.body) Object.assign(req.body, parsed.body);
      if (parsed.query) Object.assign(req.query, parsed.query);
      if (parsed.params) Object.assign(req.params, parsed.params);

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
