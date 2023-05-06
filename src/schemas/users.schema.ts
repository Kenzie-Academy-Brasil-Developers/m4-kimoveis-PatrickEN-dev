import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().min(8).max(120),
  createdAt: z.string(),
  updatedAT: z.string(),
  deletedAt: z.string().nullish(),
});

export const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAT: true,
  deletedAt: true,
});

export const userSchemaResponse = userSchema.omit({ password: true });

export const userSchemaUpdate = userSchemaRequest.omit({ id: true, admin: true }).partial();
