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
exports.deleteMedico = exports.updateMedico = exports.createMedico = exports.getMedicos = void 0;
const medico_1 = require("../models/medico");
exports.getMedicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicos = yield medico_1.Medico.find().populate('usuario', 'nombre email img').populate('hospital', 'nombre img');
    res.status(200).json({
        ok: true,
        msg: "getmedicos",
        medicos,
    });
});
exports.createMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const med = new medico_1.Medico(req.body);
        med.usuario = req.uid.uid;
        yield med.save();
        res.status(200).json({
            ok: true,
            msg: "creando medico",
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
exports.updateMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log(uid);
    try {
        const bd = yield medico_1.Medico.findById(uid);
        if (!bd) {
            return res.status(400).json({
                ok: false,
                msg: "el uid no es valido",
            });
        }
        const campos = req.body;
        campos.usuario = req.uid.uid;
        const userUpd = yield medico_1.Medico.findByIdAndUpdate(uid, campos, { new: true });
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
exports.deleteMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log(uid);
    try {
        const bd = yield medico_1.Medico.findByIdAndDelete(uid.trim());
        console.log(bd);
        if (!bd) {
            return res.status(400).json({
                ok: false,
                msg: "el uid no es valido",
            });
        }
        res.status(200).json({
            ok: true,
            msg: "delete",
            userBD: bd,
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
//# sourceMappingURL=medico.js.map