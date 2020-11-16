import { Medico } from "../models/medico";
import { Response } from "express";
import { Request } from "express";

export const getMedicos = async (req: Request, res: Response) => {
  const medicos = await Medico.find().populate('usuario', 'nombre email img').populate('hospital', 'nombre img');
  res.status(200).json({
    ok: true,
    msg: "getmedicos",
    medicos,
  });
};

export const createMedico = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const med = new Medico(req.body);
    med.usuario = req.uid.uid;
    await med.save();
    res.status(200).json({
      ok: true,
      msg: "creando medico",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

export const updateMedico = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const bd = await Medico.findById(uid);
    if (!bd) {
      return res.status(400).json({
        ok: false,
        msg: "el uid no es valido",
      });
    }
    const campos = req.body;
    campos.usuario = req.uid.uid;
    const userUpd = await Medico.findByIdAndUpdate(uid, campos, { new: true });

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

export const deleteMedico = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const bd = await Medico.findByIdAndDelete(uid.trim());
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
