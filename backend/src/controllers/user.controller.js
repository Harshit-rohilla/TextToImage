import asyncHandler from "../utilities/asyncHandler.js";
import ApiResponse from "../utilities/apiResponse.js"
import ApiError from "../utilities/apiError.js";
import {User} from "../models/User.model.js";
import { Otp } from "../models/Otp.model.js";
import sendMail from "../utilities/sendMail.js";
import otpGenerator from "otp-generator"
import crypto from "crypto"

export const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new ApiError(400,"missing details")
    }
    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(400,"user does not exists")
    }
    const comparingPassword=await user.isPasswordCorrect(password)
    if(!comparingPassword){
        throw new ApiError(400,"incorrect password")
    }
    const accessToken=user.generateAccessToken()

    const isProduction=process.env.ENVIRONMENT==="production"
    const options={httpOnly:true,secure:isProduction,sameSite:isProduction?"None":"Lax"}
    return res.cookie("accessToken",accessToken,options).status(200).json(new ApiResponse(200,{name:user.name,creditsRemaining:user.creditsRemaining},"user logged in successfully"))
})

export const signup=asyncHandler(async(req,res)=>{
    const {name,email,password,otp}=req.body

    const user=await User.findOne({email})
    if(user){
        throw new ApiError(400,"user already exists")
    }
    const otpResponse=await Otp.findOne({email})
    if(!otpResponse){
        throw new ApiError(400,"OTP expired")
    }
    if(otpResponse.otp!==otp){
        throw new ApiError(400,"incorrect OTP")
    }
    await User.create({
        name,
        email,
        password,
    })
    return res.status(200).json(new ApiResponse(200,null,"user registered!"))
})

// *will handle first time and resend of otp
export const sendOtp=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(user){
        throw new ApiError(400,"user already exists")
    }
    const isOtpExist=await Otp.findOne({email:email})
    if(isOtpExist){
        const otp=otpGenerator.generate(6,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
        isOtpExist.otp=otp
        isOtpExist.createdAt=new Date()
        await isOtpExist.save({validateBeforeSave:false})
        const response=await sendMail(email,"OTP",`Your OTP is ${otp} and will expire in 5 minutes`)
        if(!response){
        throw new ApiError(500,"unable to send otp")
        }
        return res.status(200).json(new ApiResponse(200,otp,"otp send successfully"))
        
    }
    else{
        const otp=otpGenerator.generate(6,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
        await Otp.create({email,otp})
        const response=await sendMail(email,"OTP",`Your OTP is ${otp} and will expire in 5 minutes`)
        if(!response){
        throw new ApiError(500,"unable to send otp")
        }
        return res.status(200).json(new ApiResponse(200,otp,"otp send successfully"))
    }
    
})

// *will handle first time and resend of reset password link
export const resetPasswordLink=asyncHandler(async(req,res)=>{
    const {email}=req.body
    if(!email){
        throw new ApiError(400,"please provide email")
    }
    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(400,"user with email does not exists")
    }
    const passwordToken=crypto.randomUUID()
    user.passwordToken=passwordToken
    user.tokenExpiresIn=new Date()
    await user.save({validateBeforeSave:false})
    const link=`${process.env.ORIGIN}/reset-password/${passwordToken}`
    const response=await sendMail(email,"Password reset link",`click on the link to reset your password. Link will expire in 5 minutes Link:${link}`)
    if(!response){
        throw new ApiError(500,"unable to send mail")
    }
    return res.status(200).json(new ApiResponse(200,link,"reset password link send successfully"))
})

// *setting new password controller
export const resetPassword=asyncHandler(async(req,res)=>{
    const {newPassword,confirmPassword,token}=req.body
    if(!newPassword || !confirmPassword || !token){
        throw new ApiError(400,"details missing")
    }
    if(newPassword!==confirmPassword){
        throw new ApiError(400,"password mismatch")
    }
    const user=await User.findOne({passwordToken:token})
    if(!user){
        throw new ApiError(400,"user does not exists")
    }
    if(user.tokenExpiresIn.getTime()+60*5*1000 < Date.now()){
        throw new ApiError(400,"link expired")
    }
    user.password=confirmPassword
    user.passwordToken=undefined
    user.tokenExpiresIn=undefined
    await user.save()
    return res.status(200).json(new ApiResponse(200,null,"password reset successfully"))
})

// *logout controller
export const logout=asyncHandler(async(req,res)=>{
    const isProduction=process.env.ENVIRONMENT==="production"
    const options={httpOnly:true,secure:isProduction,sameSite:isProduction?"None":"Lax"}
    res.clearCookie("accessToken",options).status(200).json(new ApiResponse(200,null,"logged out"))
})




