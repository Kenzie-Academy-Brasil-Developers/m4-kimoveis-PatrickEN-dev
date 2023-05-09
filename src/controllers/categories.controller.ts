import { Request, Response } from "express";

import { createCategoryService } from "../service/category/category.post.service";
import { TcategoryRequest } from "../@types/category.type";
import {
  listCategoryService,
  listCategoryWithRealEstateService,
} from "../service/category/category.get.service";

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const payload: TcategoryRequest = req.body;

  const newCategory = await createCategoryService(payload);

  return res.status(201).json(newCategory);
};

export const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const allCategories = await listCategoryService();

  return res.status(200).json(allCategories);
};

export const listcategoriesWithRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);
  const realEstates = await listCategoryWithRealEstateService(categoryId);

  return res.status(200).json(realEstates);
};
