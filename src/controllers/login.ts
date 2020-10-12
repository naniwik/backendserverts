import { Usuario } from "../models/usuario";
import { Response } from "express";
import { Request } from "express";
// import { validationResult } from "express-validator";
import bcryptjs, { compare } from "bcryptjs";
import { genJWT } from "../helpers/jwt";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    //verificar email
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "error con los datos",
      });
    }

    //verificar contraseña
    const validpass = bcryptjs.compareSync(password, user.password);
    if (!validpass) {
      return res.status(400).json({
        ok: false,
        msg: "error con los datos",
      });
    }

    //Generar token
    const token = await genJWT(user.id);
    res.status(200).json({
      ok: true,
      msg: "logeado",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
