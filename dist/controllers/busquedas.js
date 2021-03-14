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
exports.getDocumentos = exports.getbusquedas = void 0;
const usuario_1 = require("../models/usuario");
const hospitales_1 = require("../models/hospitales");
const medico_1 = require("../models/medico");
const getbusquedas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    const regexp = new RegExp(uid, "i");
    const [usuarios, hospitales, medicos] = yield Promise.all([
        usuario_1.Usuario.find({ nombre: regexp }),
        hospitales_1.Hospital.find({ nombre: regexp }),
        medico_1.Medico.find({ nombre: regexp }),
    ]);
    res.status(200).json({
        ok: true,
        msg: "getbusquedas",
        param: uid,
        usuarios,
        hospitales,
        medicos,
    });
});
exports.getbusquedas = getbusquedas;
const getDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tabla = req.params.tabla;
    const termino = req.params.termino;
    const regexp = new RegExp(termino, "i");
    let data;
    switch (tabla) {
        case "medicos":
            data = yield usuario_1.Usuario.find({ nombre: regexp });
            break;
        case "hospitales":
            data = yield hospitales_1.Hospital.find({ nombre: regexp });
            break;
        case "usuarios":
            data = yield usuario_1.Usuario.find({ nombre: regexp });
            break;
        default:
            return res
                .status(400)
                .json({ ok: false, msg: "tabla : usuarios, medicos u hospitales" });
    }
    res.status(200).json({
        ok: true,
        msg: "getbusquedas",
        param: [termino, tabla],
        data,
    });
});
exports.getDocumentos = getDocumentos;
//# sourceMappingURL=busquedas.js.map