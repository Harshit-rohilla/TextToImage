import mongoose from "mongoose"

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    credit:{
        type:Number,
        required:true
    }
})

export const Plan=mongoose.model("Plan",planSchema)