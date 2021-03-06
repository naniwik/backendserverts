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
exports.uploads = exports.getImagen = void 0;
const uuid_1 = require("uuid");
const uploads_1 = require("../helpers/uploads");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getImagen = (req, res) => {
    const tabla = req.params.tabla;
    const id = req.params.id;
    const pathImg = path_1.default.join(__dirname, `../uploads/${tabla}/${id}`);
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const noimagepath = path_1.default.join(__dirname, `../uploads/no-image.png`);
        res.sendFile(noimagepath);
    }
};
exports.getImagen = getImagen;
const uploads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tabla = req.params.tabla;
    const id = req.params.id;
    const tiposValidos = ["usuarios", "medicos", "hospitales"];
    if (!tiposValidos.includes(tabla)) {
        return res.status(404).json({
            ok: false,
            msg: "uploads: tabla in usuarios, medicos y hospitales",
            param: [tabla, id],
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(404).json({
            ok: false,
            msg: "falta fichero",
            param: [tabla, id],
        });
    }
    const file = req.files.imagen;
    console.log("file", file);
    const extension = file.name.split(".").pop();
    const extensionesvalidas = ["png", "jpg", "jpeg", "gif", "ico"];
    if (!extensionesvalidas.includes(extension)) {
        return res.status(404).json({
            ok: false,
            msg: "extension no valida",
            param: [tabla, id],
        });
    }
    const uuidva = uuid_1.v4();
    const nombrearchivo = `${uuidva}.${extension}`;
    //path guardar la imagen
    const ruta = `${uploads_1.RUTA}/${tabla}/${nombrearchivo}`;
    file.mv(ruta, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "error",
                param: [tabla, id, err],
            });
        }
        const wasok = yield uploads_1.actualizarImagen(tabla, id, nombrearchivo);
        if (wasok) {
            res.status(200).json({
                ok: true,
                msg: "uploads",
                param: [tabla, id, ruta],
            });
        }
        else {
            res.status(404).json({
                ok: false,
                msg: "uploads",
                param: [tabla, id, ruta],
            });
        }
    }));
});
exports.uploads = uploads;
//# sourceMappingURL=uploads.js.map