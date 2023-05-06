import { z } from "zod";
import { realEstateResponse, realEstateSchema } from "../schemas/realEstate.schema";

export type TrealEstate = z.infer<typeof realEstateSchema>;
export type TrealEstateResponse = z.infer<typeof realEstateResponse>;
