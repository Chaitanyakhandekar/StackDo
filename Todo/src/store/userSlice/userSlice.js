import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'userData',
    initialState:{
        userId:null,
        appwriteUserId:null,
        createdAt:null,
        updatedAt:null
    },
    reducers:{
        getUserData:(state,action)=>state,

        setUserData:(state,action)=>{
            const {userId,appwriteUserId,createdAt,updatedAt} = action.payload
            state.userId = userId
            state.appwriteUserId = appwriteUserId
            state.createdAt = createdAt
            state.updatedAt = updatedAt
    }
    }
})

export const {getUserData,setUserData} = userSlice.actions
export default userSlice.reducer