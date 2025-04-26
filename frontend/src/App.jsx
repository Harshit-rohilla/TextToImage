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
import { useSelector } from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute"



const App=()=>{
  const authenticated=useSelector((store)=>store.global.authenticated)
  return(
    <>
    <div className="min-h-screen w-full flex flex-col">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/buy-credit" element={<BuyCredit/>}/>
        <Route path="/generate-image" element={<ProtectedRoute condition={authenticated}><GenerateImage/></ProtectedRoute>}/>
        <Route path="/signup" element={<ProtectedRoute condition={!authenticated}><Signup/></ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ProtectedRoute condition={!authenticated}><ForgotPassword/></ProtectedRoute>}/>
        <Route path="/reset-password/:token" element={<ProtectedRoute condition={!authenticated}><ResetPassword/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default App