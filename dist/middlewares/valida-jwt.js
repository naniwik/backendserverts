"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.validaJWT = (req, res, next) => {
    //leer token
    const token = req.header("x-token");
    console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "no token",
        });
    }
    try {
        console.log("verify");
        const uid = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("uid", uid);
        if (uid) {
            req.uid = uid;
            next();
        }
        else {
            return res.status(401).json({
                ok: false,
                msg: "token no valido",
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido",
        });
    }
};
//# sourceMappingURL=valida-jwt.js.map