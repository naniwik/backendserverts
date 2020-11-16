import { Usuario } from "../models/usuario";
import { Hospital } from "../models/hospitales";
import { Medico } from "../models/medico";
import { Response } from "express";
import { Request } from "express";

export const getbusquedas = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const regexp = new RegExp(uid, "i");

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regexp }),
    Hospital.find({ nombre: regexp }),
    Medico.find({ nombre: regexp }),
  ]);

  res.status(200).json({
    ok: true,
    msg: "getbusquedas",
    param: uid,
    usuarios,
    hospitales,
    medicos,
  });
};

export const getDocumentos = async (req: Request, res: Response) => {
  const tabla = req.params.tabla;
  const termino = req.params.termino;
  const regexp = new RegExp(termino, "i");

  let data;

  switch (tabla) {
    case "medicos":
      data = await Usuario.find({ nombre: regexp });
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regexp });
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regexp });
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
};
