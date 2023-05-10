import { Request, Response } from "express";
import { listRealEstateSchedulesService } from "../service/schedule/schedules.get.service";

export const listRealEstatesSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);
  const allSchedules = await listRealEstateSchedulesService(realEstateId);

  return res.status(200).json(allSchedules);
};
