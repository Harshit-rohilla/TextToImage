import { useState } from "react"
import image1 from "../assets/image1.png"

const GenerateImage=()=>{
    const [loading, setLoading]=useState(false)
    const [image, setImage]=useState(image1)
    const [des,setDes]=useState("")
    const [isImageGenerated,setIsImageGenerated]=useState(false)

    // TODO: think about how to show a loading bar when generating image
    return(
        <>
        <div className="flex-1 pt-20 pb-30 w-11/12 max-w-[1200px] mx-auto">
            <div className="flex justify-center">
                <img src={image} className="max-w-sm rounded-sm" alt="image" />
            </div>
            
            {isImageGenerated?<div className="flex justify-center gap-2 mt-5">
                <button onClick={()=>{setIsImageGenerated(false)}} className="px-6 py-2 rounded-full cursor-pointer text-text-primary border">Generate Another</button>
                <a href={image} download className="px-6 py-2 rounded-full bg-black text-white cursor-pointer">Download</a>
            </div>:<form className="flex bg-neutral-600 my-5 md:w-xl mx-auto rounded-full">
                <input onChange={(e)=>{setDes(e.target.value)}} value={des} className=" flex-1 px-4 text-white outline-none" placeholder="Describe what you want to generate" type="text" />

                <button disabled={loading} className="px-6 cursor-pointer py-2.5 bg-black text-white rounded-full">Generate</button>
            </form>}
        </div>
        </>
    )
}
export default GenerateImage