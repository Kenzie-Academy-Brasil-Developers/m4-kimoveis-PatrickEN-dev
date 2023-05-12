import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppError } from "../errors/error";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

export const checkUserIdExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userIdBody: number = parseInt(req.params.id);

  const checkuserIdAlreadyExists = await userRepository.findOne({
    where: { id: userIdBody },
  });

  if (!checkuserIdAlreadyExists) throw new AppError("User not found", 404);

  return next();
};

export const checkIsEmailUniqueMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userEmailBody: string | null = req.body.email;

  if (userEmailBody) {
    const checkEmailAlreadyExists = await userRepository.findOne({
      where: { email: userEmailBody },
    });

    if (checkEmailAlreadyExists) throw new AppError("Email already exists", 409);
  }

  return next();
};

export const checkIsUserAdminMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = res.locals.admin;

  if (!isAdmin) throw new AppError("Insufficient permission", 403);

  return next();
};
