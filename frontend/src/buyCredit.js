import toast from "react-hot-toast";
import axios from "axios";

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

export const buy=async(planId,name,dispatch,navigate,setAuthenticated,setCreditsRemaining,setName)=>{
    const toastId=toast.loading("Loading...")
    const src="https://checkout.razorpay.com/v1/checkout.js"
    const isScriptLoaded=await loadScript(src)
    if(!isScriptLoaded){
        toast.error("Unable to load script",{id:toastId})
    }
    try {
        const orderResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-order`,{planId},{withCredentials:true})
        var options={
            "key":import.meta.env.VITE_RAZORPAY_ID,
            "amount":orderResponse.data?.data?.amount,
            "currency":"INR",
            "name":"TextToImage",
            "description":"Buy This Plan",
            "order_id":orderResponse.data?.data?.id,
            "preFill":{
                name:name
            },
            "handler":function(response){
                verifyPayment(response)
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
        toast.error("payment failed");
        });
        toast.dismiss(toastId);
    } catch (error) {
        if(error?.response?.status===401){
            toast.error("Session Expired",{id:toastId})
            localStorage.removeItem("name")
            localStorage.removeItem("creditsRemaining")
            dispatch(setAuthenticated(false))
            dispatch(setCreditsRemaining(null))
            dispatch(setName(null))
            navigate("/")
        }
        else{
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred",{id:toastId})
        }
    }
}

const verifyPayment=async(response)=>{
    const toastId=toast.loading("Verifying Payment...")
    try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verify-payment`,{...response},{withCredentials:true})
        toast.success("Payment Verified",{id:toastId})
    } catch (error) {
        // console.log(error);
        toast.error("Payment Verification Failed",{id:toastId})
    }
}