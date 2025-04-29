import { useEffect, useState } from "react"
import { Star, User, Eye, EyeSlash, X, List} from "@phosphor-icons/react";
import { useNavigate, Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setName, setIsModalVisible, setCreditsRemaining } from "../redux/slices/globalSlice";
import {motion,AnimatePresence} from "motion/react"

const Navbar=()=>{
    const [isPasswordVisible,setIsPasswordVisible]=useState(false)
    const isModalVisible=useSelector((store)=>store.global.isModalVisible)
    const [isMobileModalVisible,setIsMobileModalVisible]=useState(false)
    // const [isModalVisible, setIsModalVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const [logoutLoading,setLogoutLoading]=useState(false)
    const {register,handleSubmit,reset} = useForm();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const name=useSelector((store)=>store.global.name)
    const creditsRemaining=useSelector((store)=>store.global.creditsRemaining)
    const authenticated=useSelector((store)=>store.global.authenticated)

    // *login user api call
    const submitForm=async(data)=>{
        setLoading(true)
        const toastId=toast.loading("loading...")
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,{email:data.email,password:data.password},{withCredentials:true})
            if(response?.data?.success){
                console.log(response.data);
                dispatch(setName(response.data.data.name))
                dispatch(setCreditsRemaining(response.data.data.creditsRemaining))
                dispatch(setAuthenticated(true))
                dispatch(setIsModalVisible(false))
                localStorage.setItem("name",JSON.stringify(response.data.data.name))
                localStorage.setItem("creditsRemaining",JSON.stringify(response.data.data.creditsRemaining))
                reset()
                toast.success("logged in",{id:toastId})
                navigate("/generate-image")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "an error occurred",{id:toastId})
        } finally{
            setLoading(false)
        }
    }

    // *logout user api call + clearing local storage
    const logout=async()=>{
        setLogoutLoading(true)
        const toastId=toast.loading("loading...")
        try {
            
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`)
            if(response.data?.success){
                localStorage.removeItem("name")
                localStorage.removeItem("creditsRemaining")
                dispatch(setAuthenticated(false))
                dispatch(setCreditsRemaining(null))
                dispatch(setName(null))
                navigate("/")
                toast.success("Logged Out!",{id:toastId})
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred")
        } finally{
            setLogoutLoading(false)
        }
    }

    useEffect(()=>{
        if(isModalVisible){
            document.body.style.overflow="hidden"
        }
        else{
            document.body.style.overflow="unset"
        }

        return ()=>{
            document.body.style.overflow="unset"
        }
    },[isModalVisible])
    // const navigate=useNavigate()
    return(
        <>
        {/* navbar */}
        <header className="w-full bg-bg-secondary sticky top-0 z-40">
            <div className="w-11/12 max-w-[1200px] mx-auto flex justify-between items-center py-2">
                <Link to="/" className="text-white font-medium">Imagino</Link>
                {authenticated?<nav className="flex gap-4 items-center">
                        <Link to="/buy-credit" className="flex items-center gap-2 text-white bg-btn-primary hover:scale-105 duration-300 px-4 py-2 rounded-full"><Star className="hidden md:block" size={20} />Credits left:{creditsRemaining}</Link>
                        <p className="text-white hidden md:block">Hi! {name}</p>
                        {/* for pc */}
                        <div className="hidden md:block relative group">
                            <User size={20} color="#ffffff" weight="bold"/>
                            <div className="hidden bg-white group-hover:block absolute top-[100%] left-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                <ul><button disabled={logoutLoading} onClick={logout} className="px-3 py-1 cursor-pointer hover:bg-[rgb(230,230,230)] ">Logout</button></ul>
                            </div>
                        </div>
                        {/* for mobile */}
                        <List onClick={()=>{setIsMobileModalVisible(true)}} className="md:hidden" size={20} weight="bold" color="#ffff"/>
                        <div className={`${isMobileModalVisible?"block":"hidden"} fixed h-screen w-full backdrop-blur-md pt-10 left-0 top-0`}>
                            <div className="flex justify-end px-4"><X onClick={()=>{setIsMobileModalVisible(false)}} weight="bold" size={30} className="text-black"/></div>
                            <p onClick={()=>{setIsMobileModalVisible(false);logout()}} className="text-text-primary text-3xl font-medium text-center pt-20">Logout</p>
                        </div>

                    </nav>:<nav className="flex gap-4 items-center">
                    <Link to="/buy-credit" className="text-white">Pricing</Link>
                    <button onClick={()=>{dispatch(setIsModalVisible(true))}} className="bg-btn-primary text-white px-6 py-2 cursor-pointer rounded-full">Login</button>
                </nav>}
            </div>
        </header>

        {/* Login Modal */}
        <AnimatePresence>
        {isModalVisible?<motion.div 
        key={"login"}
        initial={{opacity:0,scale:0.2}}
        animate={{opacity:1,scale:1}}
        exit={{opacity:0,scale:0}}
        transition={{duration:0.2}}
        onClick={()=>{dispatch(setIsModalVisible(false))}} className={`fixed z-50 top-0 left-0 bg-black/30 h-screen w-full backdrop-blur-md flex justify-center items-center`}>
            <div onClick={(e)=>{e.stopPropagation()}} className="bg-white rounded-lg pt-4 pb-10 px-4">
                    <div className="flex justify-end text-text-primary cursor-pointer"><X onClick={()=>{dispatch(setIsModalVisible(false))}} weight="bold" size={20}/></div>
                    <h2 className="text-center px-6 text-text-primary text-3xl font-medium mt-2">Login</h2>
                    <p className="text-text-primary px-6 text-center mb-10">Welcome! Please login to continue</p>
                    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 md:w-80 mx-auto">
                        <input {...register("email")} type="email" placeholder="Email id" required className="px-4 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full" />
                        <div className="relative">
                            <input {...register("password")} minLength={6} placeholder="Password" type={isPasswordVisible?"text":"password"} className="pl-4 pr-10 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full" required/>
                            {isPasswordVisible?<EyeSlash onClick={()=>{setIsPasswordVisible((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>:<Eye onClick={()=>{setIsPasswordVisible((prev)=>!prev)}} size={20} className="absolute right-4 top-1/2 -translate-y-1/2"/>}
                        </div>
                        <p onClick={()=>{dispatch(setIsModalVisible(false))}} className="flex -mt-2 justify-start "><Link to="/forgot-password" className="text-[rgb(0,122,255)]">Forgot password?</Link></p>
                        <button disabled={loading} className="text-white bg-[rgb(0,122,255)] cursor-pointer py-2 text-center rounded-full">Login</button>
                    </form>
                    <p onClick={()=>{dispatch(setIsModalVisible(false))}} className="flex justify-center mt-5"><span className="text-text-primary">Don't have an account?</span><Link to="/signup" className="text-[rgb(0,122,255)] ml-1">Sign up</Link></p>
            </div>
          
        </motion.div>:null}
        </AnimatePresence>
        </>
    )
}
export default Navbar