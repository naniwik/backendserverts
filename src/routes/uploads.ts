/*
Ruta: '/api/todo'
*/

import Router from "express";
import * as uC from "../controllers/uploads";
import { validaJWT } from "../middlewares/valida-jwt";
import fileUpload from "express-fileupload";
export const routeruploads = Router();

routeruploads.use(fileUpload());
routeruploads.put("/:tabla/:id", [validaJWT], uC.uploads);
routeruploads.get("/:tabla/:id", [validaJWT], uC.getImagen);
