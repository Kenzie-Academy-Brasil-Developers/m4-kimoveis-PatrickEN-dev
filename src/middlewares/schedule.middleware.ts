import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import { AppError } from "../errors/error";

export const checkScheduleExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const userId: number = parseInt(res.locals.id);
  const { date, hour, realEstateId } = req.body;

  const userAlreadyhaveSchedule = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.userId = :userId", { userId })
    .andWhere("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .getOne();

  if (userAlreadyhaveSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const scheduleAlreadyExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.hour = :hour", { hour })
    .andWhere("schedule.date= :date", { date })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

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
