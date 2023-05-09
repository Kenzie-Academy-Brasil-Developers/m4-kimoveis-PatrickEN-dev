import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors/error";

export const listCategoryService = async (): Promise<Category[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] = await categoryRepository.find();

  return categories;
};

export const listCategoryWithRealEstateService = async (
  categoryId: number
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  console.log("chegou");

  const categoriesWithRealEstates: Category | null =
    await categoryRepository.findOne({
      where: { id: categoryId },
      relations: {
        realEstate: true,
      },
    });

  console.log(categoriesWithRealEstates);

  if (!categoriesWithRealEstates) {
    throw new AppError(`Category not found`, 404);
  }
  // const categoriesWithRealEstates: Category[] = await categoryRepository
  //   .createQueryBuilder("category")
  //   .innerJoinAndSelect("category.realEstates", "realEstate")
  //   .where("category.id = :categoryId", { categoryId })
  //   .getMany();

  // const categoriesWithRealEstates: Category[] = await categoryRepository.find({
  //   where: { id: categoryId },
  //   relations: { realEstate: true },
  // });

  return categoriesWithRealEstates;
};
