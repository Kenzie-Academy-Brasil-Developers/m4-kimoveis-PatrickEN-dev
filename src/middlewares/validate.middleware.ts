import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export const validateTokenMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals.id = decoded.sub;
    res.locals.email = decoded.email;
    res.locals.admin = decoded.admin;
  });

  return next();
};

export const validateUserPermissionMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = res.locals.admin;
  const userId = parseInt(res.locals.id);
  const requestedUserId = parseInt(req.params.id);

  if (!isAdmin) {
    if (requestedUserId !== userId) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  return next();
};
