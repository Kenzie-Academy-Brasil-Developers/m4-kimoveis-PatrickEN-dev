import { z } from "zod";
import { realEstateRequest, realEstateSchema } from "../schemas/realEstate.schema";

export type TrealEstate = z.infer<typeof realEstateSchema>;
export type TrealEstateRequest = z.infer<typeof realEstateRequest>;
