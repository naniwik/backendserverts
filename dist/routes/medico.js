"use strict";
/*
Ruta: '/api/medico'
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
exports.routerMedicos = void 0;
const express_1 = require("express");
const uC = __importStar(require("../controllers/medico"));
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const valida_jwt_1 = require("../middlewares/valida-jwt");
exports.routerMedicos = express_1.Router();
exports.routerMedicos.get('/', [valida_jwt_1.validaJWT], uC.getMedicos);
exports.routerMedicos.post('/', [
    valida_jwt_1.validaJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('hospital', 'El hospital es obligatorio').isMongoId(),
    validar_campos_1.validarcampos,
], uC.createMedico);
exports.routerMedicos.put('/:uid', [
    valida_jwt_1.validaJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('hospital', 'El hospital es obligatorio').isMongoId(),
    validar_campos_1.validarcampos,
], uC.updateMedico);
exports.routerMedicos.delete('/:uid', valida_jwt_1.validaJWT, uC.deleteMedico);
//# sourceMappingURL=medico.js.map