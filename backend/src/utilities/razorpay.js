import Razorpay from "razorpay"

export var instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_SECRET })