/*
Ruta: '/api/hospitales'
*/

import { Router } from "express";
import * as uC from '../controllers/hospitales';
import {check} from 'express-validator';
import {validarcampos} from '../middlewares/validar-campos'
import { validaJWT } from "../middlewares/valida-jwt";

export const routerHospitales = Router();

routerHospitales.get('/', [validaJWT], uC.gethospitales);

routerHospitales.post('/', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarcampos,
], uC.createHospital);

routerHospitales.put('/:uid', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarcampos,
], uC.updateHospital);

routerHospitales.delete('/:uid', validaJWT, uC.deleteHospital);