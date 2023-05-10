import { z } from "zod";
import { addressSchema, addressSchemaRequest } from "./address.schema";
import { categorySchema } from "./category.schema";

export const realEstateSchema = z.object({
  id: z.number(),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: addressSchema,
  category: categorySchema,
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateSchemaRequest = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
    category: true,
    address: true,
  })
  .extend({
    categoryId: z.number(),
    address: addressSchemaRequest,
  });
