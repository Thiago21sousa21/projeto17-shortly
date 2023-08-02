import { Router } from "express";
import usersRoutes from "./usersRoutes.js";

const indexRoute = Router();
indexRoute.use(usersRoutes);

export default indexRoute;
