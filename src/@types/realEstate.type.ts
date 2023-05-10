import { z } from "zod";
import { realEstateSchema, realEstateSchemaRequest } from "../schemas/realEstate.schema";

export type TrealEstate = z.infer<typeof realEstateSchema>;
export type TrealEstateRequest = z.infer<typeof realEstateSchemaRequest>;
