import { createSlice } from '@reduxjs/toolkit'

const initialState={name:localStorage.getItem("name")?JSON.parse(localStorage.getItem("name")):null,creditsRemaining:localStorage.getItem("creditsRemaining")?JSON.parse(localStorage.getItem("creditsRemaining")):null,authenticated:localStorage.getItem("name")?true:false,signupFormData:null,isModalVisible:false}

const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setName:(state,action)=>{
            state.name=action.payload
        },
        setCreditsRemaining:(state,action)=>{
            state.creditsRemaining=action.payload
        },
        setAuthenticated:(state,action)=>{
            state.authenticated=action.payload
        },
        setSignupFormData:(state,action)=>{
            state.signupFormData=action.payload
        },
        setIsModalVisible:(state,action)=>{
            state.isModalVisible=action.payload
        }
    }
})

export const {setName,setCreditsRemaining,setAuthenticated,setSignupFormData,setIsModalVisible}=globalSlice.actions
export default globalSlice.reducer