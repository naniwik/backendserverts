"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.genJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        const options = {
            expiresIn: "12h",
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
//# sourceMappingURL=jwt.js.map