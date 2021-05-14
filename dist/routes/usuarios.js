"use strict";
/*
Ruta: '/api/usuarios'
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = require("express");
const uC = __importStar(require("../controllers/usuario"));
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const valida_jwt_1 = require("../middlewares/valida-jwt");
exports.routerUsers = express_1.Router();
exports.routerUsers.get('/', [valida_jwt_1.validaJWT], uC.getUsuarios);
exports.routerUsers.post('/', [
    //validaJWT, //no puede tener json porque se esta creando!!
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    validar_campos_1.validarcampos,
], uC.crearUsuario);
exports.routerUsers.put('/:uid', [
    valida_jwt_1.validaJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    validar_campos_1.validarcampos,
], uC.updateUser);
exports.routerUsers.delete('/:uid', valida_jwt_1.validaJWT, uC.deleteUser);
//# sourceMappingURL=usuarios.js.map