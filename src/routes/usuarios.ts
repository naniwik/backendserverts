/*
Ruta: '/api/usuarios'
*/

import { Router } from "express";
import * as uC from '../controllers/usuario';
import {check} from 'express-validator';
import {validarcampos} from '../middlewares/validar-campos'
import { validaJWT } from "../middlewares/valida-jwt";

export const routerUsers = Router();

routerUsers.get('/', [validaJWT], uC.getUsuarios);

routerUsers.post('/', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarcampos,
], uC.crearUsuario);

routerUsers.put('/:uid', [
    validaJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarcampos,
], uC.updateUser);

routerUsers.delete('/:uid', uC.deleteUser);