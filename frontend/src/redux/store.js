import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "../redux/slices/globalSlice.js"

export const store=configureStore({
    reducer:{
        global:globalReducer
    }
})