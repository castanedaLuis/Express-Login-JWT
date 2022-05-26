import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username:{
        type: String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },

    roles:[{
        ref:"Role",
        type: Schema.Types.ObjectId
    }]
},
{
    timeseries:true,
    versionKey:false,
});


//Metodos para cifrar contraseña y comparar contraseña
userSchema.static.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)    
}

userSchema.static.comparePassword = async (password, receivedPassword) => { 
    return await bcrypt.compare(password, receivedPassword);
}


export default model('User',userSchema);