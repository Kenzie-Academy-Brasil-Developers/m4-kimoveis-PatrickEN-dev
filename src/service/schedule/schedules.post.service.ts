import { Repository } from "typeorm";
import { TscheduleRequest } from "../../@types/schedules.type";
import { Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createScheduleService = async (payload: TscheduleRequest): Promise<string> => {
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const newSchedule: Schedule | null = scheduleRepository.create(payload);

  await scheduleRepository.save(newSchedule);

  return "Schedule created";
};
