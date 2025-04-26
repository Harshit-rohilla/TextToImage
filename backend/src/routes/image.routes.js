import { Router } from "express";
import { generateImage } from "../controllers/image.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

export const imageRouter=Router()
imageRouter.route("/generate-image").post(verifyJwt,generateImage)