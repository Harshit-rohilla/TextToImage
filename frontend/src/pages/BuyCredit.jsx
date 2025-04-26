import {plans} from "../assets/data"
import { useDispatch, useSelector } from "react-redux";

const BuyCredit=()=>{
    const authenticated=useSelector((store)=>store.global.authenticated)
    
    return(
        <>
        <div className="flex-1 w-11/12 max-w-[1200px] mx-auto pt-20 pb-30">
            <p className="px-6 mx-auto py-2 w-fit rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-text-primary">Our Plans</p>
            <p className="text-center text-text-primary text-4xl font-medium mt-10">Choose the plan</p>
            <div className="flex flex-col md:flex-row gap-6 mt-10 items-center md:justify-center">
                {plans.map((plan,index)=><div key={index} className="py-10 px-8 rounded-md  bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <h2 className="text-text-primary text-lg font-medium">{plan.id}</h2>
                    <p className="text-text-primary mt-2 mb-5">{plan.desc}</p>
                    <p className="text-text-primary mb-10"><span className="text-3xl font-medium">${plan.price}</span>{" "}<span>/{plan.credits}</span></p>
                    <button className="bg-black cursor-pointer w-full text-white text-center py-2 rounded-sm">{authenticated?"Purchase":"Get started"}</button>
                </div>)}
            </div>
        </div>
        </>
    )
}
export default BuyCredit