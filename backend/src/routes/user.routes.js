import { Router } from "express";
import { login, resetPassword, resetPasswordLink, sendOtp, signup, logout } from "../controllers/user.controller.js";

export const userRouter=Router()

userRouter.route("/login").post(login)
userRouter.route("/signup").post(signup)
userRouter.route("/otp").post(sendOtp)
userRouter.route("/reset-password-link").post(resetPasswordLink)
userRouter.route("/reset-Password").post(resetPassword)
userRouter.route("/logout").get(logout)
