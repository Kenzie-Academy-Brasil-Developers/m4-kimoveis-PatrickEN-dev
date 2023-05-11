import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/error";

export const listRealEstateSchedulesService = async (
  realEstateId: number
): Promise<RealEstate | null> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const isRealStateIdExists = await realEstateRepository.findOne({
    where: { id: realEstateId },
  });

  if (!isRealStateIdExists) throw new AppError("RealEstate not found", 404);

  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("realEstate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne();

  return realEstate;
};
