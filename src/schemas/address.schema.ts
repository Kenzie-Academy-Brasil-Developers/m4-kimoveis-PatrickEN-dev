import { z } from "zod";

export const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(45),
  number: z.string().max(8).nullable().optional(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const addressSchemaRequest = addressSchema.omit({
  id: true,
});
