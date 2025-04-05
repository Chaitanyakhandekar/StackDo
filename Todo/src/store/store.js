import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './slices/todoSlice'
import userReducer from './userSlice/userSlice'

export const store = configureStore({
    reducer:{
        todos:todoReducer,
        userData:userReducer
    }
})