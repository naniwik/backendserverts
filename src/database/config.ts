import mongoose from "mongoose";

export const dbCon = async() =>{
    try{
        await mongoose.connect(process.env.DB_CON, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
        console.info('db online ');
    } catch (error){
        console.log(error);
        throw new Error('Error inicial la BD');
    }
}
