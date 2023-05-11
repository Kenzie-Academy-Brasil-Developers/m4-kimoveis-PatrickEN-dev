import { z } from "zod";

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});

export const scheduleSchemaRequest = scheduleSchema.omit({ id: true });
