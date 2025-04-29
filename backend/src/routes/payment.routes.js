import {Router} from "express"
import { generateOrder,paymentPlans,verifyPayment } from "../controllers/payment.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"


export const paymentRouter=Router()

paymentRouter.route("/create-order").post(verifyJwt,generateOrder)
paymentRouter.route("/verify-payment").post(verifyJwt,verifyPayment)
paymentRouter.route("/payment-plans").get(paymentPlans)