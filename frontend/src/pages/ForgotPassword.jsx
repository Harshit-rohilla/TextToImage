import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {ArrowLeft} from "@phosphor-icons/react"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalVisible } from '../redux/slices/globalSlice';
import axios from 'axios';


const ForgotPassword=()=>{
    const {register,handleSubmit,reset}=useForm()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    

    const submitForm=async(data)=>{
        setLoading(true)
        const toastId=toast.loading("loading...")
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/reset-password-link`,{email:data.email})
            if(response.data?.success){
                toast.success("reset link send to your email",{id:toastId})
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
            <form onSubmit={handleSubmit(submitForm)} className="md:w-md bg-white px-6 pt-4 pb-10 flex flex-col rounded-md gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <h1 className="text-text-primary text-center mb-4 text-3xl font-medium">Forgot Password</h1>
                <input {...register("email")} className="px-4 py-2 border border-text-primary rounded-full" type="email" placeholder="Enter your email" required/>
                <button disabled={loading} className="bg-btn-primary cursor-pointer py-2 rounded-full text-white">Submit</button>
                <div className='flex justify-start'><button  onClick={()=>{navigate("/");dispatch(setIsModalVisible(true))}} className='text-text-primary cursor-pointer'><ArrowLeft size={20} weight='bold'/></button></div>
            </form>
        </main>
        </>
    )
}
export default ForgotPassword