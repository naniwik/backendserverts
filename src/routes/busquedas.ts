/*
Ruta: '/api/todo'
*/

import { Router } from "express";
import * as uC from '../controllers/busquedas';
import { validaJWT } from "../middlewares/valida-jwt";

export const routerbusquedas = Router();

routerbusquedas.get('/:uid', [validaJWT], uC.getbusquedas);
routerbusquedas.get('/coleccion/:tabla/:termino', [validaJWT], uC.getDocumentos);