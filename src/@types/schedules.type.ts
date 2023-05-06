import { z } from "zod";
import { scheduleSchema, scheduleSchemaResponse } from "../schemas/schedules.schema";

export type Tschedule = z.infer<typeof scheduleSchema>;
export type TscheduleResponse = z.infer<typeof scheduleSchemaResponse>;
