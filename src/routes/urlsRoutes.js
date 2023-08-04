import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { shortenSchema } from "../schemas/urlsSchemas.js";
import { deleteUrl, getRanking, getUrlById, redirectByShort, shortenUrl } from "../controllers/urlsControllers.js";

export const urlsRoutes = Router();

urlsRoutes.post('/urls/shorten', tokenValidation, schemaValidation(shortenSchema), shortenUrl);
urlsRoutes.get('/urls/:id', getUrlById );
urlsRoutes.get('/urls/open/:shortUrl', redirectByShort);
urlsRoutes.delete('/urls/:id', tokenValidation, deleteUrl);
urlsRoutes.get('/ranking', getRanking);