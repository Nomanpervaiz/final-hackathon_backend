import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cnic: { type: String, required: true, unique: true },
    name: {type : String , required : true },
    email: {type : String , unique : true },
    password: {type : String , required : true },
} , {timestamps : true})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

