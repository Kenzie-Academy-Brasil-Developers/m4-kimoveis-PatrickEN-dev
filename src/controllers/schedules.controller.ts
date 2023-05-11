import { Request, Response } from "express";
import { listRealEstateSchedulesService } from "../service/schedule/schedules.get.service";
import { TscheduleRequest } from "../@types/schedules.type";
import { createScheduleService } from "../service/schedule/schedules.post.service";

export const createSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const payload: TscheduleRequest = req.body;

  const newSchedule = await createScheduleService(payload);

  return res.status(201).json({ message: newSchedule });
};

export const listRealEstatesSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);
  const allSchedules = await listRealEstateSchedulesService(realEstateId);

  return res.status(200).json(allSchedules);
};
