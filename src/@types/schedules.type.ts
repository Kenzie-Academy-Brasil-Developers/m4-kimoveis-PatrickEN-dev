import { z } from "zod";
import { scheduleSchema, scheduleSchemaRequest } from "../schemas/schedules.schema";

export type Tschedule = z.infer<typeof scheduleSchema>;
export type TscheduleRequest = z.infer<typeof scheduleSchemaRequest>;
