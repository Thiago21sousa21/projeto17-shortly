import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { signupSchema } from "../schemas/accountsSchemas.js";

const accountsRoutes = Router();
accountsRoutes.post('/signup', schemaValidation(signupSchema))

export default accountsRoutes;