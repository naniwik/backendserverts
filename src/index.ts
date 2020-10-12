// Requires
// var express = require("express"); //javascript
import express from "express"; // typescript
import {dbCon} from "./database/config";
import dotenv from "dotenv";
import cors from 'cors';
import {routerUsers} from './routes/usuarios';
import {routerLogin} from './routes/auth';
import { Response } from "express";
import { Request } from "express";

dotenv.config();

// Inicializar variables
const app = express();

app.use(cors());

//Lectura y parseo del body, debe ponerse al principio, antes de las rutas
app.use(express.json());

// DBCon
dbCon();

// console.log(process.env);
// usuarios
// main_user
// idk7pT4PBLVzZuya

// Rutas
app.get('/', (req: Request, res: Response, next)=> {
    res.status(200).json({
        ok:true,
        mensaje:'OK'
    })
});

app.use('/api/usuarios', routerUsers);

// app.get('/api/usuarios', (req, res, next)=> {
//     res.status(200).json({
//         ok:true,
//         usuarios:[{
//             id:123,
//             nombre:'Oliver'
//         }]
//     })
// });


app.use('/login', routerLogin);

// escuchar peticiones
const port = (process.env.SERVER_PORT);
app.listen(port, () => {
   console.log('Express server ' + port+': \x1b[32m%s\x1b[0m', 'online');
});

