import { Router } from "express";
import {
  createRealEstateController,
  listRealEstatesController,
} from "../controllers/realEstate.controller";
import { validateRequestBodyMid } from "../middlewares/validateBody/validateBody.middleware";
import { realEstateSchemaRequest } from "../schemas/realEstate.schema";
import { validateTokenMid } from "../middlewares/validate.middleware";
import { checkIsUserAdminMid } from "../middlewares/users.middleware";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  validateTokenMid,
  checkIsUserAdminMid,
  validateRequestBodyMid(realEstateSchemaRequest),
  createRealEstateController
);

realEstateRoutes.get("", listRealEstatesController);
