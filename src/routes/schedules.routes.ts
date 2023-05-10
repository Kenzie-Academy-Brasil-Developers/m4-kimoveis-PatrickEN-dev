import { Router } from "express";
import { validateTokenMid } from "../middlewares/validate.middleware";
import { checkIsUserAdminMid } from "../middlewares/check.middleware";
import { listRealEstatesSchedulesController } from "../controllers/schedules.controller";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post("");
scheduleRoutes.get(
  "/realEstate/:id",
  validateTokenMid,
  checkIsUserAdminMid,
  listRealEstatesSchedulesController
);
