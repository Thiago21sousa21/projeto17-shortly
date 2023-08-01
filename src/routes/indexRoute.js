import { Router } from "express";
import accountsRoutes from "./accountsRoutes.js";

const indexRoute = Router();
indexRoute.use(accountsRoutes);

export default indexRoute;
