import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/error";

export const verifyUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo: Repository<User> = AppDataSource.getRepository(User);
  const userId: number = parseInt(req.body.userId);

  const movieExists = await movieRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!movieExists) {
    throw new AppError("user not found", 404);
  }

  return next();
};

export const verifyIfMovieEmailExistsThenBlockMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieRepo: Repository<User> = AppDataSource.getRepository(User);
  const movieEmail: string | null = req.body.email;

  if (movieEmail) {
    const movieExists = await movieRepo.findOne({
      where: {
        email: movieEmail,
      },
    });

    if (movieExists) {
      throw new AppError("email already exists.", 409);
    }
  }

  return next();
};
