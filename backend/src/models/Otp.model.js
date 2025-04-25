import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    }
})

export const Otp=mongoose.model("Otp",otpSchema)

