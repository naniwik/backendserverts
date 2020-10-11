// Requires
// var express = require("express"); //javascript
import express from "express"; // typescript
import {dbCon} from "./database/config";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

// Inicializar variables
const app = express();

app.use(cors());
// DBCon
dbCon();

// console.log(process.env);
// usuarios
// main_user
// idk7pT4PBLVzZuya

// Rutas
app.get('/', (req, res, next)=> {
    res.status(200).json({
        ok:true,
        mensaje:'OK'
    })
});

// escuchar peticiones
const port = (process.env.SERVER_PORT);
app.listen(port, () => {
   console.log('Express serveryyyy ' + port+': \x1b[32m%s\x1b[0m', 'online');
});

