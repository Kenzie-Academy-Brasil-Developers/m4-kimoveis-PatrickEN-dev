import { z } from "zod";
import { userSchema, userSchemaRequest, userSchemaResponse } from "../schemas/users.schema";
import { DeepPartial } from "typeorm";

export type Tuser = z.infer<typeof userSchema>;
export type TuserRequest = z.infer<typeof userSchemaRequest>;
export type TuserResponse = z.infer<typeof userSchemaResponse>;
export type TuserUpdate = DeepPartial<TuserResponse>;
