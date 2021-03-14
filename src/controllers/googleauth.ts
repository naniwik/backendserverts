import { googleverify } from "../helpers/google-verify";
import { Response } from "express";
import { Request } from "express";
// import { validationResult } from "express-validator";
import bcryptjs, { compare } from "bcryptjs";
import { genJWT } from "../helpers/jwt";
import { Usuario } from "../models/usuario";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const token = req.body.token;
try{
    const {name, email, picture} = await googleverify(token);

    const usuarioDB = await Usuario.findOne({email});
    let usuario;
    if (!usuarioDB){
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google :true
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    await usuario.save();
    const jwtoken = await genJWT(usuario.id);

    return res.status(400).json({
        ok: true,
        msg: "google sign in, exito",
        token : jwtoken
      });

}catch(err){
  return res.status(401).json({
    ok: false,
    msg: "google sign in, token no correcto",
    token
  });
}
};
