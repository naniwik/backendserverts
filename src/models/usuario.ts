import mongoose from "mongoose";

export interface IUsuario extends mongoose.Document{
    nombre:string,
    email:string,
    password:string,
    img:string,
    role:string,
    google:boolean
}

export const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

export const Usuario = mongoose.model<IUsuario> ('Usuario', UsuarioSchema);

