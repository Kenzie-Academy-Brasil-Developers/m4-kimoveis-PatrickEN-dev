import { z } from "zod";
import { categorySchema, categorySchemaResponse } from "../schemas/category.schema";

export type Tcategory = z.infer<typeof categorySchema>;
export type TcategoryResponse = z.infer<typeof categorySchemaResponse>;
