import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/user.routes.js"
import { imageRouter } from "./routes/image.routes.js"

const app=express()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
})
})
.catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin:[process.env.ORIGIN],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/image",imageRouter)

// *Global error handler
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.statusCode || 500).json({success:false,message:err.message || "something went wrong"})
})
