import { Response } from "express";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { actualizarImagen, RUTA } from "../helpers/uploads";
import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";

export const getImagen = (req: Request, res: Response) => {
  const tabla = req.params.tabla;
  const id = req.params.id;

  const pathImg = path.join(__dirname, `../uploads/${tabla}/${id}`);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const noimagepath = path.join(__dirname, `../uploads/no-image.png`);
    res.sendFile(noimagepath);
  }
};

export const uploads = async (req: Request, res: Response) => {
  const tabla = req.params.tabla;
  const id = req.params.id;

  const tiposValidos = ["usuarios", "medicos", "hospitales"];
  if (!tiposValidos.includes(tabla)) {
    return res.status(404).json({
      ok: false,
      msg: "uploads: tabla in usuarios, medicos y hospitales",
      param: [tabla, id],
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(404).json({
      ok: false,
      msg: "falta fichero",
      param: [tabla, id],
    });
  }

  const file = req.files.imagen as UploadedFile;
  console.log("file", file);
  const extension = file.name.split(".").pop();

  const extensionesvalidas = ["png", "jpg", "jpeg", "gif", "ico"];
  if (!extensionesvalidas.includes(extension)) {
    return res.status(404).json({
      ok: false,
      msg: "extension no valida",
      param: [tabla, id],
    });
  }

  const uuidva = uuidv4();
  const nombrearchivo = `${uuidva}.${extension}`;

  //path guardar la imagen
  const ruta = `${RUTA}/${tabla}/${nombrearchivo}`;

  file.mv(ruta, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "error",
        param: [tabla, id, err],
      });
    }
    const wasok: boolean = await actualizarImagen(tabla, id, nombrearchivo);
    if (wasok) {
      res.status(200).json({
        ok: true,
        msg: "uploads",
        param: [tabla, id, ruta],
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "uploads",
        param: [tabla, id, ruta],
      });
    }
  });
};
