import { XLogo, InstagramLogo, GithubLogo  } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Footer=()=>{
    // TODO: add title and to attribute in social media icons link
    return(
        <>
        <footer className="w-full bg-bg-secondary">
            <div className="w-11/12 max-w-[1200px] mx-auto flex items-center justify-between py-2">
                <div className="md:flex md:justify-between ">
                    <p className="text-white md:pr-5">Imagino</p>
                    <p className="text-white text-sm md:text-base md:pl-5 md:border-l-2 ">All right reserved. Copyright @Imagino</p>
                </div>
                <nav className="flex gap-2 md:gap-4 items-center text-white">
                    <Link className="hover:scale-110 text-btn-primary duration-300"><XLogo weight="bold"/></Link>
                    <Link className="hover:scale-110 text-btn-primary duration-300"><InstagramLogo weight="bold" size={20}/></Link>
                    <Link className="hover:scale-110 text-btn-primary duration-300"><GithubLogo weight="bold" size={20}/></Link>
                </nav>
            </div>
        </footer>        
        </>
    )
}
export default Footer
