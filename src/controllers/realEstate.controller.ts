import { Request, Response } from "express";
import { TrealEstateRequest } from "../@types/realEstate.type";
import { createRealEstateService } from "../service/realEstate/realEstate.post.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TrealEstateRequest = req.body;

  const newRealEstate = await createRealEstateService(payload);

  return res.status(201).json(newRealEstate);
};
