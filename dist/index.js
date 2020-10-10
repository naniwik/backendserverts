"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Requires
// var express = require("express"); //javascript
const express_1 = __importDefault(require("express")); // typescript
const config_1 = require("./database/config");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Inicializar variables
const app = express_1.default();
app.use(cors_1.default());
// DBCon
config_1.dbCon();
// console.log(process.env);
// usuarios
// main_user
// idk7pT4PBLVzZuya
// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'OK'
    });
});
// escuchar peticiones
const port = (process.env.SERVER_PORT);
app.listen(port, () => {
    console.log('Express server ' + port + ': \x1b[32m%s\x1b[0m', 'online');
});
//# sourceMappingURL=index.js.map