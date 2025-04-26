import { Navigate } from "react-router-dom"

const ProtectedRoute=({condition,children})=>{
    if(condition){
        return children
    }
    else{
        return <Navigate to="/"/>
    }
}
export default ProtectedRoute