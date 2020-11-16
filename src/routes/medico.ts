/*
Ruta: '/api/medico'
*/

import { Router } from "express";
import * as uC from '../controllers/medico';
import {check} from 'express-validator';
import {validarcampos} from '../middlewares/validar-campos'
import { validaJWT } from "../middlewares/valida-jwt";

export const routerMedicos = Router();

routerMedicos.get('/', [validaJWT], uC.getMedicos);

routerMedicos.post('/', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('hospital', 'El hospital es obligatorio').isMongoId(),
    validarcampos,
], uC.createMedico);

routerMedicos.put('/:uid', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('hospital', 'El hospital es obligatorio').isMongoId(),
    validarcampos,
], uC.updateMedico);

routerMedicos.delete('/:uid', validaJWT, uC.deleteMedico);