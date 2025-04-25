import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { Eye,EyeSlash } from "@phosphor-icons/react";
import axios from "axios";

const ResetPassword=()=>{
        const {register,handleSubmit,reset}=useForm()
        const [loading,setLoading]=useState(false)
        const {token}=useParams()
        const [isPasswordVisible,setIsPasswordVisible]=useState(false)
        const [isPasswordVisible2,setIsPasswordVisible2]=useState(false)
        const [isResetCompleted,setIsResetCompleted]=useState(false)

        const submitForm=async(data)=>{
            if(data.newPassword!==data.confirmPassword){
                toast.error("password mismatch")
                return
            }
            setLoading(true)
            const toastId=toast.loading("loading...")
            try {
                const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/reset-password`,{newPassword:data.newPassword,confirmPassword:data.confirmPassword,token:token})
                if(response.data?.success){
                    toast.success("Your password has been updated!",{id:toastId})
                    setIsResetCompleted(true)
                    reset()
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "An error occurred",{id:toastId})
            } finally{
                setLoading(false)
            }
        }
        return(
            <>
            <main className="flex-1 flex justify-center items-center">
                {isResetCompleted?
                <main>
                    <h2 className="text-text-primary text-3xl">Password Updated</h2> 
                    <p className="text-text-primary mt-2">Close this window and login again</p>
                </main>
                :<form onSubmit={handleSubmit(submitForm)} className="md:w-md bg-white px-6 pt-4 pb-10 flex flex-col rounded-md gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <h1 className="text-text-primary text-center mb-4 text-3xl font-medium">Reset Password</h1>
                    <div className="relative">
                        <input {...register("newPassword")} placeholder="New Password" type={isPasswordVisible?"text":"password"} className="pl-4 pr-10 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full" />
                        {isPasswordVisible?<EyeSlash onClick={()=>{setIsPasswordVisible((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>:<Eye onClick={()=>{setIsPasswordVisible((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>}
                    </div>
                    <div className="relative">
                        <input {...register("confirmPassword")} placeholder="Confirm Password" type={isPasswordVisible2?"text":"password"} className="pl-4 pr-10 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full" />
                        {isPasswordVisible2?<EyeSlash onClick={()=>{setIsPasswordVisible2((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>:<Eye onClick={()=>{setIsPasswordVisible2((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>}
                    </div>
                    <button disabled={loading} className="bg-btn-primary cursor-pointer py-2 rounded-full text-white">Submit</button>
                </form>}
            </main>
            </>
        )
}
export default ResetPassword