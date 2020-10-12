"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarcampos = void 0;
const express_validator_1 = require("express-validator");
exports.validarcampos = (req, res, next) => {
    const errores = express_validator_1.validationResult(req);
    console.log(errores);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        });
    }
    next();
};
//# sourceMappingURL=validar-campos.js.map