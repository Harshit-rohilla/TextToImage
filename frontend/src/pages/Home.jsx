import { Eye, DownloadSimple, MagicWand } from "@phosphor-icons/react";
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpg"
import image5 from "../assets/image5.jpg"
import {testimonialsData} from "../assets/data"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "motion/react"
import { Rating } from 'react-simple-star-rating'




const Home=()=>{
    const navigate=useNavigate()
    const authenticated=useSelector((store)=>store.global.authenticated)
    const goToGenerateImage=()=>{
        if(authenticated){
            navigate("/generate-image")
        }
        else{
            toast.error("Please login")
        }
    }
    return(
        <>
        <div className="flex-1 pt-20 w-11/12 max-w-[1200px] mx-auto pb-30">
            <main>
                <motion.p
                initial={{scale:0.5, opacity:0.2, y:-100}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:0.7}}
                className="w-fit mx-auto bg-white px-6 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-text-primary">Best text to image generator</motion.p>
                <motion.h1
                initial={{scale:0.5, opacity:0.2, y:50}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:0.6}}
                className=" mt-10 text-text-primary text-center mx-auto text-5xl md:text-7xl">Turn text to</motion.h1>
                <motion.p
                initial={{scale:0.5, opacity:0.2, y:50}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:0.6}}
                className=" text-text-primary w-full text-center mx-auto text-5xl md:text-7xl">image, in seconds.</motion.p>
                <motion.h2
                initial={{scale:0.5, opacity:0.2, y:50}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:0.8}}
                className="md:max-w-xl text-center text-text-primary mt-5 mx-auto">Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.</motion.h2>
                <motion.div
                initial={{scale:0.5, opacity:0.2, y:50}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:0.9}}
                className="w-full flex justify-center">
                <button
                onClick={goToGenerateImage} className="bg-black hover:rotate-2 text-white hover:scale-105 duration-300 cursor-pointer px-6 py-2 rounded-full mt-5 mx-auto ">Generate Images</button>
                </motion.div>
                <motion.div
                initial={{scale:0.5, opacity:0.2, y:50}}
                animate={{scale:1, opacity:1, y:0}}
                transition={{duration:1}}
                className="md:w-96 mx-auto grid grid-cols-5 gap-4 mt-10">
                    <img className="aspect-square rounded-sm hover:scale-105 duration-300 cursor-pointer" src={image1} alt="image" />
                    <img className="aspect-square rounded-sm hover:scale-105 duration-300 cursor-pointer" src={image2} alt="image" />
                    <img className="aspect-square rounded-sm hover:scale-105 duration-300 cursor-pointer" src={image3} alt="image" />
                    <img className="aspect-square rounded-sm hover:scale-105 duration-300 cursor-pointer" src={image4} alt="image" />
                    <img className="aspect-square rounded-sm hover:scale-105 duration-300 cursor-pointer" src={image5} alt="image" />
                </motion.div>
                <p className="text-text-primary text-center mt-2">Generated images from Title</p>
            </main>

        {/* three steps section */}
            <section className="w-full mt-30">
                <h2 className="text-center font-medium text-4xl text-text-primary">How it works</h2>
                <p className="text-center text-text-primary">Transform Words Into Stunning Images</p>
                {/* three white boxes */}
                <div className="flex mx-auto md:w-[620px] flex-col gap-4 justify-center mt-10">
                    <motion.div 
                    initial={{scale:0.5, opacity:0.2, y:50}}
                    whileInView={{scale:1, opacity:1, y:0}}
                    transition={{duration:0.8,type: "spring", stiffness: 100, damping: 10}}
                    viewport={{once:true}}
                    className="w-full bg-white flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md px-6 py-4">
                        <Eye className="text-text-primary" size={25} weight="bold" />
                        <div>
                            <p className="text-text-primary">Describe Your Vision</p>
                            <p className="text-text-primary text-xs">Type a phrase, sentence, or paragraph that describes the image you want to create.</p>    
                        </div>   
                    </motion.div>
                    <motion.div 
                    initial={{scale:0.5, opacity:0.2, y:50}}
                    whileInView={{scale:1, opacity:1, y:0}}
                    transition={{duration:0.8,type: "spring", stiffness: 100, damping: 10}}
                    viewport={{once:true}}
                    className="w-full bg-white flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md px-6 py-4">
                        <MagicWand className="text-text-primary" size={25} weight="bold" />
                        <div>
                            <p className="text-text-primary">Watch the Magic</p>
                            <p className="text-text-primary text-xs">Our AI-powered engine will transform your text into a high-quality, unique image in seconds.</p>    
                        </div>   
                    </motion.div>
                    <motion.div 
                    initial={{scale:0.5, opacity:0.2, y:50}}
                    whileInView={{scale:1, opacity:1, y:0}}
                    transition={{duration:0.8,type: "spring", stiffness: 100, damping: 10}}
                    viewport={{once:true}}
                    className="w-full bg-white flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md px-6 py-4">
                        <DownloadSimple className="text-text-primary" size={25} weight="bold" />
                        <div>
                            <p className="text-text-primary">Download & Share</p>
                            <p className="text-text-primary text-xs">Instantly download your creation or share it with the world directly from our platform.</p>    
                        </div>   
                    </motion.div>
                </div>
            </section>

        {/* big image section */}
            <section className="w-full mt-30">
                <h2 className="text-center text-text-primary font-medium text-4xl">Create AI Images</h2>
                <p className="text-center text-text-primary">Turn your imagination into visuals</p>
                <div className="mt-10 md:w-4xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
                    <motion.div 
                    initial={{ opacity:0, x:-100}}
                    whileInView={{ opacity:1, x:0}}
                    transition={{duration:0.8}}
                    viewport={{once:true}}
                    className="w-full h-full">
                        <img src={image1} className="h-full w-full object-cover rounded-md" alt="image" loading="lazy" />
                    </motion.div>
                    <motion.div 
                    initial={{ opacity:0.2, x:100}}
                    whileInView={{ opacity:1, x:0}}
                    transition={{duration:0.8}}
                    viewport={{once:true}}
                    className="flex flex-col gap-4">
                        <h2 className="text-2xl text-text-primary font-medium">Introducing the AI-Powered Text to Image Generator</h2>
                        <p className="text-text-primary">Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                        <p className="text-text-primary">Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
                    </motion.div>
                </div>
            </section>
        
        {/* testimonial section */}
            <section className="w-full mt-30">
                <h2 className="text-text-primary font-medium text-4xl text-center">Customer testimonials</h2>
                <p className="text-text-primary text-center">What Our Users Are Saying</p>
                <div className="mt-10 flex flex-col md:flex-row md:justify-center items-center gap-6 ">
                    {
                        testimonialsData.map((tm,index)=><div
                        
                        key={index}  className="py-8 hover:scale-105 duration-300 cursor-pointer rounded-md w-80 h-80 px-6 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[rgba(255,255,255,0.5)] border-[1px] border-[rgba(255,255,255,0.25)]">
                            <img src={tm.image} alt="image" className="w-10 h-10 object-cover"/>
                            <h2 className="text-text-primary font-medium text-lg">{tm.name}</h2>
                            <p className="text-text-primary font-medium text-sm">{tm.role}</p>
                            <Rating className="mb-5" SVGstyle={{ display: "inline-block" }}
                            size={20}
                            allowFraction
                            readonly 
                            initialValue={tm.stars} />
                            <p className="text-text-primary text-center">{tm.text}</p>
                        </div>)
                    }
                </div>
            </section>

            <section className="w-full mt-30">
                <h2 className="md:text-4xl text-5xl font-medium text-center text-text-primary">See the magic. Try now</h2>
                <div className="flex justify-center">
                    <button onClick={goToGenerateImage} className="bg-black text-white hover:rotate-2 hover:scale-105 duration-300 cursor-pointer px-6 py-2 rounded-full mt-5 mx-auto">Generate Images</button>
                </div>
            </section>
        </div>
        </>
    )
}
export default Home