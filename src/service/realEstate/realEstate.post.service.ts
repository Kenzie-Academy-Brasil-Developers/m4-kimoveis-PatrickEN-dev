import { Repository } from "typeorm";
import { TrealEstate, TrealEstateRequest } from "../../@types/realEstate.type";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/error";

export const createRealEstateService = async (
  payload: TrealEstateRequest
): Promise<TrealEstate> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const { address, categoryId } = payload;

  const realEstateWithSameAddress = await addressRepository.findOne({
    where: { ...address, number: address.number || "" },
  });

  if (realEstateWithSameAddress) {
    throw new AppError("Address already exists", 409);
  }

  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const newAddress = addressRepository.create(address);

  await addressRepository.save(newAddress);

  const newRealEstate = realEstateRepository.create({
    ...payload,
    sold: false,
    address: newAddress,
    category,
  });

  const savedRealEstate = await realEstateRepository.save(newRealEstate);

  return savedRealEstate;
};
