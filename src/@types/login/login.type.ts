import { z } from "zod";
import { loginSchema } from "../../schemas/login/login.schema";

export type TLogin = z.infer<typeof loginSchema>;

export interface IToken {
  token: string;
}
