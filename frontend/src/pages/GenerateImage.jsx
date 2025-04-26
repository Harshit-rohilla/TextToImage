import { useState } from "react"
import image1 from "../assets/image1.png"
import axios from "axios"
import toast from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import { setCreditsRemaining, setAuthenticated, setName } from "../redux/slices/globalSlice";
import { useNavigate } from "react-router-dom"

const GenerateImage=()=>{
    const [loading, setLoading]=useState(false)
    const [des,setDes]=useState("")
    const [isImageGenerated,setIsImageGenerated]=useState(false)
    const dispatch=useDispatch()
    const [generatedImage,setGeneratedImage]=useState("")
    const creditsRemaining=useSelector((store)=>store.global.creditsRemaining)
    const navigate=useNavigate()

    const generateImage=async(e)=>{
        e.preventDefault()
        if(creditsRemaining<=0){
            toast.error("No Credits Left")
            return
        }
        const toastId=toast.loading("generating image...")
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/image/generate-image`,{prompt:des},{withCredentials:true})
            
            setGeneratedImage(response.data?.data?.image)
            setIsImageGenerated(true)
        
            dispatch(setCreditsRemaining(response?.data?.data?.creditsRemaining))
            toast.dismiss(toastId)
            localStorage.setItem("creditsRemaining",JSON.stringify(response?.data?.data?.creditsRemaining))
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
            
        } finally{
            setLoading(false)
        }
    }

    // TODO: think about how to show a loading bar when generating image
    return(
        <>
        <div className="flex-1 pt-20 pb-30 w-11/12 max-w-[1200px] mx-auto">
            <div className="flex justify-center">
                <img src={generatedImage?generatedImage:image1} className="max-w-sm rounded-sm" alt="image" />
            </div>
            
            {isImageGenerated?<div className="flex justify-center gap-2 mt-5">
                <button onClick={()=>{setIsImageGenerated(false)}} className="px-6 py-2 rounded-full cursor-pointer text-text-primary border">Generate Another</button>
                <a href={generatedImage} download className="px-6 py-2 rounded-full bg-black text-white cursor-pointer">Download</a>
            </div>:<form onSubmit={generateImage} className="flex bg-neutral-600 my-5 md:w-xl mx-auto rounded-full">
                <input onChange={(e)=>{setDes(e.target.value)}} value={des} className=" flex-1 px-4 text-white outline-none" placeholder="Describe what you want to generate" type="text" />

                <button disabled={loading} className="px-6 cursor-pointer py-2.5 bg-black text-white rounded-full">Generate</button>
            </form>}
        </div>
        </>
    )
}
export default GenerateImage