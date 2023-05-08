import { Router } from "express";
import { validateRequestBodyMid } from "../middlewares/validateBody/validateBody.middleware";
import { userSchemaRequest } from "../schemas/users.schema";
import { checkIsEmailUniqueMid, checkIsUserAdminMid } from "../middlewares/check.middleware";
import { createUserController, listUserController } from "../controllers/users.controller";
import { validateTokenMid } from "../middlewares/validate.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateRequestBodyMid(userSchemaRequest),
  checkIsEmailUniqueMid,
  createUserController
);
usersRoutes.get("", validateTokenMid, checkIsUserAdminMid, listUserController);
usersRoutes.patch("/:id");
usersRoutes.delete("/:id");
