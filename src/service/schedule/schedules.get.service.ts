import { Repository } from "typeorm";
import { Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";

export const listRealEstateSchedulesService = async (realEstateId: number): Promise<Schedule[]> => {
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const schedules: Schedule[] = await scheduleRepository
    .createQueryBuilder("schedules")
    .leftJoinAndSelect("schedules.realEstate", "realEstate")
    .where("realEstate.id = :id", { id: realEstateId })
    .getMany();

  return schedules;
};
