import { Response } from "express";
import { Request } from "express";
import { validationResult } from "express-validator";

export const validarcampos = (req: Request, res: Response, next: any) => {
  const errores = validationResult(req);
  console.log(errores);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped(),
    });
  }
  next();
};
