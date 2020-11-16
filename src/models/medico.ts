import mongoose, { Schema } from "mongoose";

export interface IMedico extends mongoose.Document {
  nombre: string;
  img: string;
  usuario: string;
  hospital: string;
}

export const MedicoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { collection: "medicos" }
);

MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

export const Medico = mongoose.model<IMedico>("Medico", MedicoSchema);
