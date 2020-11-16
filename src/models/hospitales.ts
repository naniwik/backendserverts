import mongoose, { Schema } from "mongoose";

export interface IHospital extends mongoose.Document {
  nombre: string;
  img: string;
  usuario: string;
}

export const HospitalSchema = new mongoose.Schema(
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
  },
  { collection: "hospitales" }
);

HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

export const Hospital = mongoose.model<IHospital>("Hospital", HospitalSchema);
