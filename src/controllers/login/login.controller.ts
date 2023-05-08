import { Request, Response } from "express";
import { TLogin } from "../../@types/login/login.type";
import { createTokenService } from "../../service/login/createToken.service";

export const createTokenController = async (req: Request, res: Response): Promise<Response> => {
  const loginData: TLogin = req.body;

  const token = await createTokenService(loginData);

  return res.status(200).json(token);
};
