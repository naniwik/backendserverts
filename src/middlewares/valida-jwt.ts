import jwt from "jsonwebtoken";
import { Response } from "express";
import { Request } from "express";
import { UID } from "custom";

export const validaJWT = (req: Request, res: Response, next: any) => {
  //leer token
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no token",
    });
  }

  try {
    console.log("verify");
    const uid: UID = jwt.verify(token, process.env.JWT_SECRET) as UID;
    console.log("uid", uid);
    if (uid) {
      req.uid = uid;
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: "token no valido",
      });
    }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }
};
