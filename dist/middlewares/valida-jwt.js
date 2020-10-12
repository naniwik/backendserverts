"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaJWT = void 0;
exports.validaJWT = (req, res, next) => {
    //leer token
    const token = req.header("x-token");
    console.log('mierda!!!!!!');
    //   if (!errores.isEmpty()) {
    //     return res.status(400).json({
    //       ok: false,
    //       errores: errores.mapped(),
    //     });
    //   }
    next();
};
//# sourceMappingURL=valida-jwt.js.map