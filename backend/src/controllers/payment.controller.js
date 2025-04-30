import asyncHandler from "../utilities/asyncHandler.js";
import { instance } from "../utilities/razorpay.js";
import ApiError from "../utilities/apiError.js";
import ApiResponse from "../utilities/apiResponse.js";
import { Plan } from "../models/Plan.model.js";
import crypto from "crypto";
import { User } from "../models/User.model.js";

export const generateOrder=asyncHandler(async(req,res)=>{
    const {planId}=req.body
    if(!planId){
        throw new ApiError(400,"details missing")
    }
    const plan=await Plan.findById(planId)
    if(!plan){
        throw new ApiError(400,"Invalid Plan")
    }

    try {
        const response=await instance.orders.create({
            amount:plan.amount*100,
            currency:"INR",
            receipt: `receipt_${Date.now()}`
        })
        return res.status(200).json(new ApiResponse(200,response,"Order Created"))
    } catch (error) {
        
        throw new ApiError(500,error?.error?.description || "Unable to create order")
    }
})

export const verifyPayment = asyncHandler(async (req, res) => {
  const razorpay_payment_id = req.body["razorpay_payment_id"];
  const razorpay_order_id = req.body["razorpay_order_id"];
  const razorpay_signature = req.body["razorpay_signature"];
  const { credits } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Payment verification failed: Missing details");
  }
  const user = await User.findById(req.payload.id);
  if (!user) {
    throw new ApiError(400, "Invalid User");
  }
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new ApiError(400, "Payment verification Failed");
  }
  user.creditsRemaining = user.creditsRemaining + credits;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, null, "Payment Verified"));
});

export const paymentPlans = asyncHandler(async (req, res) => {
  setTimeout(async () => {
    const plans = await Plan.find();
    res
      .status(200)
      .json(new ApiResponse(200, plans, "plans send successfully"));
  }, 10);
});
