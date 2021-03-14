"use strict";
/*
Ruta: '/api/login'
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
exports.routerLogin = void 0;
const express_1 = require("express");
const uC = __importStar(require("../controllers/login"));
const gC = __importStar(require("../controllers/googleauth"));
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.routerLogin = express_1.Router();
exports.routerLogin.post('/', [
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    validar_campos_1.validarcampos,
], uC.login);
exports.routerLogin.post('/google', [
    express_validator_1.check('token', 'El token google es obligatorio').notEmpty(),
    validar_campos_1.validarcampos,
], gC.login);
//# sourceMappingURL=auth.js.map