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
exports.deleteHospital = exports.updateHospital = exports.createHospital = exports.gethospitales = void 0;
const hospitales_1 = require("../models/hospitales");
const gethospitales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitales = yield hospitales_1.Hospital.find().populate('usuario', 'nombre email img');
    res.status(200).json({
        ok: true,
        msg: "gethospitales",
        hospitales,
    });
});
exports.gethospitales = gethospitales;
const createHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const hos = new hospitales_1.Hospital(req.body);
        hos.usuario = req.uid.uid;
        yield hos.save();
        res.status(200).json({
            ok: true,
            msg: "creando hospital",
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
exports.createHospital = createHospital;
const updateHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log("update hospital", uid);
    try {
        const bd = yield hospitales_1.Hospital.findById(uid);
        if (!bd) {
            return res.status(400).json({
                ok: false,
                msg: "el uid no es valido",
            });
        }
        const campos = req.body;
        campos.usuario = req.uid.uid;
        const userUpd = yield hospitales_1.Hospital.findByIdAndUpdate(uid, campos, {
            new: true,
        });
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
exports.updateHospital = updateHospital;
const deleteHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    console.log(uid);
    try {
        const bd = yield hospitales_1.Hospital.findByIdAndDelete(uid.trim());
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
exports.deleteHospital = deleteHospital;
//# sourceMappingURL=hospitales.js.map