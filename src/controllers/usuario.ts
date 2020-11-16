import { Usuario } from "../models/usuario";
import { Response } from "express";
import { Request } from "express";
// import { validationResult } from "express-validator";
import bcryptjs, { compare } from "bcryptjs";
import { genJWT } from "../helpers/jwt";

export const getUsuarios = async (req: Request, res: Response) => {
  const from = Number(req.query.from) || 0;
  const count = Number(req.query.count) || 5;
  console.log(from, count);

  // const usuarios = await Usuario.find({}, "nombre email google role").skip(from).limit(count);
  // const total = await Usuario.estimatedDocumentCount();
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email google role img").skip(from).limit(count),
    Usuario.estimatedDocumentCount(),
  ]);

  res.status(200).json({
    ok: true,
    msg: "getUsuarios",
    usuarios,
    total,
  });
};

export const crearUsuario = async (req: Request, res: Response) => {
  console.log(req.body);

  //esto lo hace el middleware
  //   const errores = validationResult(req);
  //   console.log(errores);
  //   if (!errores.isEmpty()){
  //     return res.status(400).json({
  //         ok: false,
  //         errores:errores.mapped(),
  //       });
  //   }

  try {
    const existeEmail = await Usuario.findOne({ email: req.body.email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "el correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);
    //encrypt contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    await usuario.save();
    const token = await genJWT(usuario.id);

    res.status(200).json({
      ok: true,
      msg: "creando usuario",
      usuario,
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

export const updateUser = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const userBD = await Usuario.findById(uid);
    if (!userBD) {
      return res.status(400).json({
        ok: false,
        msg: "el uid no es valido",
      });
    }

    const campos = req.body;
    delete campos.password;
    delete campos.google;

    if (campos.email === userBD.email) {
      delete campos.email;
    } else {
      const existUser = await Usuario.findOne({ email: campos.email });
      if (existUser) {
        return res.status(400).json({
          ok: false,
          msg: "el email pertenece a otro usuario",
        });
      }
    }

    const userUpd = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

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

export const deleteUser = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    //const userBD = await Usuario.findById(uid.trim());

    const userBD = await Usuario.findByIdAndDelete(uid.trim());
    console.log(userBD);
    if (!userBD) {
      return res.status(400).json({
        ok: false,
        msg: "el uid no es valido",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "delete",
      userBD,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
