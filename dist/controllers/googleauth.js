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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const google_verify_1 = require("../helpers/google-verify");
const jwt_1 = require("../helpers/jwt");
const usuario_1 = require("../models/usuario");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const token = req.body.token;
    try {
        const { name, email, picture } = yield google_verify_1.googleverify(token);
        const usuarioDB = yield usuario_1.Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new usuario_1.Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        yield usuario.save();
        const jwtoken = yield jwt_1.genJWT(usuario.id);
        return res.status(400).json({
            ok: true,
            msg: "google sign in, exito",
            jwtoken
        });
    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            msg: "google sign in, token no correcto",
            token
        });
    }
});
exports.login = login;
//# sourceMappingURL=googleauth.js.map