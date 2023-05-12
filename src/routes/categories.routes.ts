import { Router } from "express";

import { validateTokenMid } from "../middlewares/validate.middleware";
import { validateRequestBodyMid } from "../middlewares/validateBody/validateBody.middleware";
import { categorySchemaRequest } from "../schemas/category.schema";
import {
  createCategoryController,
  listCategoriesController,
  listcategoriesWithRealEstatesController,
} from "../controllers/categories.controller";
import { checkIsUserAdminMid } from "../middlewares/users.middleware";

export const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  validateTokenMid,
  checkIsUserAdminMid,
  validateRequestBodyMid(categorySchemaRequest),
  createCategoryController
);
categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/realEstate", listcategoriesWithRealEstatesController);
