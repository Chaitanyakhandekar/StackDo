import React from "react";
import { useSelector } from "react-redux";

function Home(){
    const userData = useSelector((state)=>state.userData)
    return(
        <div className="text-xl text-white bg-blue-400 p-3 rounded-md text-center">
        <h1 className="">Welcome to ByteTodo</h1>
        <h1>UserId = {userData.userId}</h1>
        <h1>appwriteUserId = {userData.appwriteUserId}</h1>
        <h1>created At = {userData.createdAt}</h1>
        <h1>updated At = {userData.updatedAt}</h1>
        </div >
    )
}

export default Home;