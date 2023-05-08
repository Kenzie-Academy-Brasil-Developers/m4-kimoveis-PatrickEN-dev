import { Router } from "express";
import { validateRequestBodyMid } from "../middlewares/validateBody/validateBody.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/users.schema";
import {
  checkIsEmailUniqueMid,
  checkIsUserAdminMid,
  checkUserIdExistsMid,
} from "../middlewares/check.middleware";
import {
  createUserController,
  desactiveUserController,
  listUserController,
  updateUserController,
} from "../controllers/users.controller";
import { validateTokenMid, validateUserPermissionMid } from "../middlewares/validate.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateRequestBodyMid(userSchemaRequest),
  checkIsEmailUniqueMid,
  createUserController
);
usersRoutes.get("", validateTokenMid, checkIsUserAdminMid, listUserController);

usersRoutes.patch(
  "/:id",
  validateTokenMid,
  validateRequestBodyMid(userSchemaUpdate),
  checkUserIdExistsMid,
  validateUserPermissionMid,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  validateTokenMid,
  checkUserIdExistsMid,
  validateUserPermissionMid,
  desactiveUserController
);
