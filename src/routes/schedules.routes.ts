import { Router } from "express";
import { validateTokenMid } from "../middlewares/validate.middleware";

import {
  createSchedulesController,
  listRealEstatesSchedulesController,
} from "../controllers/schedules.controller";
import { validateRequestBodyMid } from "../middlewares/validateBody/validateBody.middleware";
import { scheduleSchemaRequest } from "../schemas/schedules.schema";
import {
  checkScheduleDateAndHourIsValidMid,
  checkScheduleExistsMid,
} from "../middlewares/schedule.middleware";
import { checkRealEstateIdExists } from "../middlewares/realEstate.middleware";
import { checkIsUserAdminMid } from "../middlewares/users.middleware";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  validateTokenMid,
  validateRequestBodyMid(scheduleSchemaRequest),
  checkRealEstateIdExists,
  checkScheduleExistsMid,
  checkScheduleDateAndHourIsValidMid,
  createSchedulesController
);

scheduleRoutes.get(
  "/realEstate/:id",
  validateTokenMid,
  checkIsUserAdminMid,
  listRealEstatesSchedulesController
);
