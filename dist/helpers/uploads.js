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
exports.actualizarImagen = exports.RUTA = void 0;
const medico_1 = require("../models/medico");
const fs_1 = __importDefault(require("fs"));
exports.RUTA = './src/uploads';
exports.actualizarImagen = (tipo, id, nombrearchivo) => __awaiter(void 0, void 0, void 0, function* () {
    switch (tipo) {
        case "medicos":
            updateMedico(id, tipo, nombrearchivo);
            break;
        case "hospitales":
            break;
        case "usuarios":
            break;
    }
});
const updateMedico = (id, tipo, nombrearchivo) => __awaiter(void 0, void 0, void 0, function* () {
    const medico = yield medico_1.Medico.findById(id);
    if (!medico) {
        console.log('no hay medico por ese id');
        return false;
    }
    console.log('si lo hay');
    const pathViejo = `${exports.RUTA}/${tipo}/${medico.img}`;
    if (fs_1.default.existsSync(pathViejo)) {
        fs_1.default.unlinkSync(pathViejo);
    }
    medico.img = nombrearchivo;
    yield medico.save();
    return true;
});
//# sourceMappingURL=uploads.js.map