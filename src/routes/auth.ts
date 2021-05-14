/*
Ruta: '/api/login'
*/

import { Router } from "express";
import * as uC from '../controllers/login';
import * as gC from '../controllers/googleauth';
import {check} from 'express-validator';
import {validarcampos} from '../middlewares/validar-campos'
import { validaJWT } from "../middlewares/valida-jwt";

export const routerLogin = Router();

routerLogin.post('/', [
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarcampos,
], uC.login);

routerLogin.post('/google', [
    check('token', 'El token google es obligatorio').notEmpty(),
    validarcampos,
], gC.login);

routerLogin.get('/renew', [
    validaJWT,
], uC.renewToken);