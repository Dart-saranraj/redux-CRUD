import { configureStore } from "@reduxjs/toolkit";
import empReducer from '../features/emp/employeeSlice'

export const store = configureStore({
    reducer:{
        empDetails: empReducer
    }
})