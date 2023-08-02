import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { signinSchema, signupSchema } from "../schemas/usersSchemas.js";
import { signin, signup } from "../controllers/usersControllers.js";

const usersRoutes = Router();
usersRoutes.post('/signup', schemaValidation(signupSchema), signup);
usersRoutes.post('/signin', schemaValidation(signinSchema), signin);

export default usersRoutes;