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
exports.deleteUser = exports.updateUser = exports.crearUsuario = exports.getUsuarios = void 0;
const usuario_1 = require("../models/usuario");
// import { validationResult } from "express-validator";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
exports.getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = Number(req.query.from) || 0;
    const count = Number(req.query.count) || 5;
    console.log(from, count);
    // const usuarios = await Usuario.find({}, "nombre email google role").skip(from).limit(count);
    // const total = await Usuario.estimatedDocumentCount();
    const [usuarios, total] = yield Promise.all([
        usuario_1.Usuario.find({}, "nombre email google role").skip(from).limit(count),
        usuario_1.Usuario.estimatedDocumentCount(),
    ]);
    res.status(200).json({
        ok: true,
        msg: "getUsuarios",
        usuarios,
        total,
    });
});
exports.crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //esto lo hace el middleware
    //   const errores = validationResult(req);
    //   console.log(errores);
    //   if (!errores.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         errores:errores.mapped(),
    //       });
    //   }
    try {
        const existeEmail = yield usuario_1.Usuario.findOne({ email: req.body.email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "el correo ya esta registrado",
            });
        }
        const usuario = new usuario_1.Usuario(req.body);
        //encrypt contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(usuario.password, salt);
        yield usuario.save();
        const token = yield jwt_1.genJWT(usuario.id);
        res.status(200).json({
            ok: true,
            msg: "creando usuario",
            usuario,
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
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log(uid);
    try {
        const userBD = yield usuario_1.Usuario.findById(uid);
        if (!userBD) {
            return res.status(400).json({
                ok: false,
                msg: "el uid no es valido",
            });
        }
        const campos = req.body;
        delete campos.password;
        delete campos.google;
        if (campos.email === userBD.email) {
            delete campos.email;
        }
        else {
            const existUser = yield usuario_1.Usuario.findOne({ email: campos.email });
            if (existUser) {
                return res.status(400).json({
                    ok: false,
                    msg: "el email pertenece a otro usuario",
                });
            }
        }
        const userUpd = yield usuario_1.Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: "update",
            userUpd,
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
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log(uid);
    try {
        //const userBD = await Usuario.findById(uid.trim());
        const userBD = yield usuario_1.Usuario.findByIdAndDelete(uid.trim());
        console.log(userBD);
        if (!userBD) {
            return res.status(400).json({
                ok: false,
                msg: "el uid no es valido",
            });
        }
        res.status(200).json({
            ok: true,
            msg: "delete",
            userBD,
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
//# sourceMappingURL=usuario.js.map