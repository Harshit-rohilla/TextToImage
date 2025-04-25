import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BuyCredit from "./pages/BuyCredit"
import Footer from "./components/Footer"
import GenerateImage from "./pages/GenerateImage"
import ForgotPassword from "./pages/ForgotPassword"
import Signup from "./pages/Signup"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"


const App=()=>{
  return(
    <>
    <div className="min-h-screen w-full flex flex-col">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/buy-credit" element={<BuyCredit/>}/>
        <Route path="/generate-image" element={<GenerateImage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default App