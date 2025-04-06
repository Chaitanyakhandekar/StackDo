import React,{useState,useEffect} from "react";import { Client, Account, ID } from "appwrite";
import {Link} from 'react-router-dom'
import { setUserData } from "../../store/userSlice/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const dispatch = useDispatch()
const userData = useSelector((state)=>state.userData)
const navigate = useNavigate()

useEffect(()=>{
    console.log(userData)
},[userData])

useEffect(()=>{
    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67efd413003a478100a0')
    const account = new Account(client)
    account.deleteSessions().then().catch() 
},[])


function clearFields(){
    setEmail(null)
    setPassword(null)
}

async function handleLogin(){
    try {
        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('67efd413003a478100a0')
        
        const account = new Account(client)
        const response = await account.createEmailPasswordSession(email,password)
        if(response){
            alert("Login Successfully")
            dispatch(setUserData({
                userId:response.userId,
                appwriteUserId:response.$id,
                createdAt:response.$createdAt,
                updatedAt:response.$updatedAt
            }))

            navigate('/home')
        }
    } catch (error) {
        
    }

    clearFields()
}


return(
    <div className="bg-[#0F172A] w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="bg-[#1E293B] max-w-md w-full h-[60%] rounded-xl m-2 flex flex-col items-center justify-evenly  text-white">
            <div className="mb-2 mt-2">
                <h1 className="text-3xl font-bold text-center mb-3">ByteCode Todo App</h1>
                <h1 className="text-center text-gray-400">Organize Tasks effortless</h1>
            </div>
            <div className="w-[90%] h-[20%] text-white  ">
                <label>Email</label><br />
                <input type="text" placeholder="Email" className="bg-[#334155] w-full h-[60%] px-3 text-md mt-2  rounded-xl" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="w-[90%] h-[20%] text-white ">
                <label>Password</label><br />
                <input type="password" placeholder="Password"
                 className="bg-[#334155] w-full h-[60%] px-3 text-md mt-2  rounded-xl"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 />
            </div>
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] mt-2 text-white text-xl font-bold w-[90%] h-[10%] rounded-xl"
            onClick={handleLogin}
            >Login</button>
            <div className="text-center text-gray-400">
                <p>Don't have account ? <Link to="/signup" className="text-[#7C3AED]">Create account</Link></p>
                <p>Forgot password?</p>
            </div>
        </div>
    </div>
)

}

export default Login;