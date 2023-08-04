import { Router } from "express";
import usersRoutes from "./usersRoutes.js";
import { urlsRoutes } from "./urlsRoutes.js";

const indexRoute = Router();
indexRoute.use(usersRoutes);
indexRoute.use(urlsRoutes);

export default indexRoute;
