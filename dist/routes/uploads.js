"use strict";
/*
Ruta: '/api/todo'
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeruploads = void 0;
const express_1 = __importDefault(require("express"));
const uC = __importStar(require("../controllers/uploads"));
const valida_jwt_1 = require("../middlewares/valida-jwt");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
exports.routeruploads = express_1.default();
exports.routeruploads.use(express_fileupload_1.default());
exports.routeruploads.put("/:tabla/:id", [valida_jwt_1.validaJWT], uC.uploads);
exports.routeruploads.get("/:tabla/:id", [valida_jwt_1.validaJWT], uC.getImagen);
//# sourceMappingURL=uploads.js.map