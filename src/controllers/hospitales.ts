import { Hospital } from "../models/hospitales";
import { Response } from "express";
import { Request } from "express";

export const gethospitales = async (req: Request, res: Response) => {
  const hospitales = await Hospital.find().populate('usuario', 'nombre email img');

  res.status(200).json({
    ok: true,
    msg: "gethospitales",
    hospitales,
  });
};

export const createHospital = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const hos = new Hospital(req.body);
    hos.usuario = req.uid.uid;
    await hos.save();
    res.status(200).json({
      ok: true,
      msg: "creando hospital",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

export const updateHospital = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log("update hospital", uid);
  try {
    const bd = await Hospital.findById(uid);
    if (!bd) {
      return res.status(400).json({
        ok: false,
        msg: "el uid no es valido",
      });
    }
    const campos = req.body;
    campos.usuario = req.uid.uid;
    const userUpd = await Hospital.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "update",
      userUpd,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

export const deleteHospital = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const bd = await Hospital.findByIdAndDelete(uid.trim());
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
