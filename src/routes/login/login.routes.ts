import { Router } from "express";
import { validateRequestBodyMid } from "../../middlewares/validateBody/validateBody.middleware";
import { loginSchema } from "../../schemas/login/login.schema";
import { createTokenController } from "../../controllers/login/login.controller";

export const loginRoute: Router = Router();

loginRoute.post("", validateRequestBodyMid(loginSchema), createTokenController);
