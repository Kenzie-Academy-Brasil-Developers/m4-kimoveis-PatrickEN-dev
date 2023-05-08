import { z } from "zod";

export const realEstateSchema = z.object({
  id: z.number(),
  value: z.number().default(0),
  size: z.number(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(45),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateResponse = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});
