/*
Ruta: '/api/login'
*/

import { Router } from "express";
import * as uC from '../controllers/login';
import {check} from 'express-validator';
import {validarcampos} from '../middlewares/validar-campos'

export const routerLogin = Router();

routerLogin.post('/', [
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarcampos,
], uC.login);