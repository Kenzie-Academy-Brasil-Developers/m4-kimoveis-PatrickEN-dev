import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErros } from "./errors/error";
import { usersRoutes } from "./routes/users.routes";
import { loginRoute } from "./routes/login/login.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { realEstateRoutes } from "./routes/realEstate.routes";
import { scheduleRoutes } from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/categories", categoryRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErros);

export default app;
