import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export const validateTokenMid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals.id = decoded.sub;
    res.locals.email = decoded.email;
    res.locals.isAdmin = decoded.admin;
  });

  return next();
};
