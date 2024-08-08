import { Schema, model } from "mongoose";
import { systemRoles } from "../../src/utils/system-roles.js";
const userscema=new Schema({
    username:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 20,
        tirm: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        tirm: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: [systemRoles.USER, systemRoles.ADMIN],
        default: systemRoles.USER
    },
  

},
{timestamps:true})

export default model('User', userscema)