"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const usuario_1 = require("../models/usuario");
// import { validationResult } from "express-validator";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        //verificar email
        const user = yield usuario_1.Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "error con los datos",
            });
        }
        //verificar contraseña
        const validpass = bcryptjs_1.default.compareSync(password, user.password);
        if (!validpass) {
            return res.status(400).json({
                ok: false,
                msg: "error con los datos",
            });
        }
        //Generar token
        const token = yield jwt_1.genJWT(user.id);
        res.status(200).json({
            ok: true,
            msg: "logeado",
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map