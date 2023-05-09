import { Repository } from "typeorm";
import { TrealEstateRequest } from "../../@types/realEstate.type";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createRealEstateService = async (payload: TrealEstateRequest): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const newRealEstate: RealEstate = realEstateRepository.create(payload);

  await realEstateRepository.save(newRealEstate);

  return newRealEstate;
};
