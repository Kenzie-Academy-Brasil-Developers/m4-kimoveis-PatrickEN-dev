import { NextFunction, Request, Response } from "express";
import { Repository, getRepository } from "typeorm";
import { Schedule, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/error";

export const checkUserIdExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userIdBody: number = parseInt(req.params.id);

  const checkuserIdAlreadyExists = await userRepository.findOne({
    where: {
      id: userIdBody,
    },
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
      where: {
        email: userEmailBody,
      },
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

export const checkScheduleExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const userId: number = parseInt(res.locals.id);
  const { date, hour, realEstateId } = req.body;

  const thereIsRealEstateId = await scheduleRepository.find({
    where: { realEstate: { id: realEstateId } },
    relations: { realEstate: true },
  });

  if (!thereIsRealEstateId) throw new AppError("RealEstate not found", 404);

  const scheduleAlreadyExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.userId = :userId", { userId })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .andWhere("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .getOne();

  console.log("scheduleAlreadyExists", scheduleAlreadyExists);

  if (scheduleAlreadyExists)
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);

  return next();
};

export const checkScheduleDateAndHourIsValidMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour } = req.body;

  const scheduleHour = parseInt(hour.split(":")[0]);
  const scheduleDate = new Date(date);
  const scheduleDayOfWeek = scheduleDate.getUTCDay();

  if (scheduleHour < 8 || scheduleHour >= 18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  if (scheduleDayOfWeek === 6 || scheduleDayOfWeek === 0)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  return next();
};
