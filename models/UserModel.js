import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String , required : true },
    email: {type : String , unique : true },
    password: {type : String , required : true },
    role: {type : String , required : true , default : "user"},
} , {timestamps : true})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

