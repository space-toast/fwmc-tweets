import { Request, Response, NextFunction } from "express";
// import "dotenv/config";r

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.SYNC_API_KEY) {
    return res.status(403).send({ error: "Invalid API key" });
  }

  next();
}