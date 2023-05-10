import { Request, Response } from "express";
import { TrealEstateRequest } from "../@types/realEstate.type";
import { createRealEstateService } from "../service/realEstate/realEstate.post.service";
import { listRealEstateService } from "../service/realEstate/realEstate.get.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TrealEstateRequest = req.body;

  const newRealEstate = await createRealEstateService(payload);

  return res.status(201).json(newRealEstate);
};

export const listRealEstatesController = async (req: Request, res: Response): Promise<Response> => {
  const allRealEstates = await listRealEstateService();

  return res.status(200).json(allRealEstates);
};
