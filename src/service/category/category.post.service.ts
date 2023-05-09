import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TcategoryRequest } from "../../@types/category.type";

import { AppError } from "../../errors/error";

export const createCategoryService = async (payload: TcategoryRequest): Promise<Category> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const { name } = payload;

  const categoryWithSameName = await categoryRepository.findOne({
    where: { name },
  });

  if (categoryWithSameName) {
    throw new AppError("Category already exists", 409);
  }

  const newCategory: Category = categoryRepository.create(payload);

  await categoryRepository.save(newCategory);

  return newCategory;
};
