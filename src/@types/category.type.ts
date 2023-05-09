import { z } from "zod";
import { categorySchema, categorySchemaRequest } from "../schemas/category.schema";

export type Tcategory = z.infer<typeof categorySchema>;
export type TcategoryRequest = z.infer<typeof categorySchemaRequest>;
