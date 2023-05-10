import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors/error";

export const listCategoryService = async (): Promise<Category[]> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const categories: Category[] = await categoryRepository.find();

  return categories;
};

export const listCategoryWithRealEstateService = async (categoryId: number): Promise<Category> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const categoriesWithRealEstates: Category | null = await categoryRepository
    .createQueryBuilder("category")
    .select(["category.id", "category.name"])
    .leftJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  if (!categoriesWithRealEstates) {
    throw new AppError(`Category not found`, 404);
  }

  return categoriesWithRealEstates;
};
