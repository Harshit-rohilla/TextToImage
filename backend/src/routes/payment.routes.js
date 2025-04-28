import {Router} from "express"
import { generateOrder,paymentPlans,verifyPayment } from "../controllers/payment.controller.js"


export const paymentRouter=Router()

paymentRouter.route("/create-order").post(generateOrder)
paymentRouter.route("/verify-payment").post(verifyPayment)
paymentRouter.route("/payment-plans").get(paymentPlans)