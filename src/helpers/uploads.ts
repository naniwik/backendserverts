import { Usuario } from "../models/usuario";
import { Hospital } from "../models/hospitales";
import { Medico } from "../models/medico";
import fs from "fs";

export const RUTA = "./src/uploads";

export const actualizarImagen = async (
  tipo: string,
  id: string,
  nombrearchivo: string
) => {
  let wasok: boolean;
  switch (tipo) {
    case "medicos":
      wasok = await updateMedico(id, tipo, nombrearchivo);
      break;
    case "hospitales":
        wasok = await updateHospital(id, tipo, nombrearchivo);
      break;
    case "usuarios":
        wasok = await updateUsuario(id, tipo, nombrearchivo);
      break;
  }
  return wasok;
};

const updateMedico = async (
  id: string,
  tipo: string,
  nombrearchivo: string
) => {
  const medico = await Medico.findById(id);
  if (!medico) {
    console.log("no hay medico por ese id");
    return false;
  }
  console.log("si lo hay");
  const pathViejo = `${RUTA}/${tipo}/${medico.img}`;
  if (fs.existsSync(pathViejo)) {
    fs.unlinkSync(pathViejo);
  }
  medico.img = nombrearchivo;
  await medico.save();
  return true;
};

const updateHospital = async (
    id: string,
    tipo: string,
    nombrearchivo: string
  ) => {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      console.log("no hay hospital por ese id");
      return false;
    }
    console.log("si lo hay");
    const pathViejo = `${RUTA}/${tipo}/${hospital.img}`;
    if (fs.existsSync(pathViejo)) {
      fs.unlinkSync(pathViejo);
    }
    hospital.img = nombrearchivo;
    await hospital.save();
    return true;
  };

  const updateUsuario = async (
    id: string,
    tipo: string,
    nombrearchivo: string
  ) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      console.log("no hay usuario por ese id");
      return false;
    }
    console.log("si lo hay");
    const pathViejo = `${RUTA}/${tipo}/${usuario.img}`;
    if (fs.existsSync(pathViejo)) {
      fs.unlinkSync(pathViejo);
    }
    usuario.img = nombrearchivo;
    await usuario.save();
    return true;
  };
