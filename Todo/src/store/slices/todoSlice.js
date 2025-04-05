import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name:'todos',
    initialState:0,
    reducers:{
        increament:(state,action) => state + 1,
        decreament:(state,action)=>state - 1
    }
})

export const {increament,decreament} = todoSlice.actions
export default todoSlice.reducer