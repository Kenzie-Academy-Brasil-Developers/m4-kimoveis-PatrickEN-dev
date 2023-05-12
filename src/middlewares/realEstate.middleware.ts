import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/error";

export const checkRealEstateIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const realEstateId: number = parseInt(req.body.realEstateId);

  const isThereRealEstateId: RealEstate | null = await realEstateRepository.findOne({
    where: { id: realEstateId },
  });

  if (!isThereRealEstateId) throw new AppError("RealEstate not found", 404);

  return next();
};
