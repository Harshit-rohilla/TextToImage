import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import axios from "axios"
import { buy } from "../buyCredit";
import { useNavigate } from "react-router-dom";
import { setAuthenticated,setCreditsRemaining, setName } from "../redux/slices/globalSlice";

const BuyCredit=()=>{
    const authenticated=useSelector((store)=>store.global.authenticated)
    const [plans,setPlans]=useState([])
    const [loading,setLoading]=useState(false)
    const name=useSelector((store)=>store.global.name)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const fetchPlans=async()=>{
        try {
            setLoading(true)
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/payment/payment-plans`)
            
            if(response?.data?.success){
                setPlans(response.data.data)
            }
            
        } catch (error) {
            console.log(error);
            
            toast.error(error?.response?.data?.message || "An error occurred")
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{fetchPlans()},[])
    return(
        <>
        <div className="flex-1 w-11/12 max-w-[1200px] mx-auto pt-20 pb-30">
            {loading?<div className="flex justify-center items-center h-full w-full">
                <span className="loader"></span>
            </div>:<><p className="px-6 mx-auto py-2 w-fit rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-text-primary">Our Plans</p>
            <p className="text-center text-text-primary text-4xl font-medium mt-10">Choose the plan</p>
            <div className="flex flex-col md:flex-row gap-6 mt-10 items-center md:justify-center">
                {plans.map((plan)=><div key={plan._id} className="py-10 px-8 rounded-md  bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <h2 className="text-text-primary text-lg font-medium">{plan.name}</h2>
                    <p className="text-text-primary mt-2 mb-5">{plan.description}</p>
                    <p className="text-text-primary mb-10"><span className="text-3xl font-medium">₹{plan.amount}</span>{" "}<span>/{plan.credit}</span></p>
                    <button onClick={()=>{buy(plan._id,name,dispatch,navigate,setAuthenticated,setCreditsRemaining,setName)}} className="bg-black cursor-pointer w-full text-white text-center py-2 rounded-sm">{authenticated?"Purchase":"Get started"}</button>
                </div>)}
            </div></>}
        </div>
        </>
    )
}
export default BuyCredit