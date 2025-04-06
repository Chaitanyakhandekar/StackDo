import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiLogOut, FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import '../../App.css'
import TodoItem from "../../components/TodoItem";
import { useNavigate } from "react-router";
import {Client,Account} from 'appwrite'


function Home() {
    const userData = useSelector((state) => state.userData)
    const [b1, setB1] = useState(true)
    const [b2, setB2] = useState(false)
    const [b3, setB3] = useState(false)
    const [b4, setB4] = useState(false)
    const [addSection,setAddSection] = useState(false)
    const navigate = useNavigate()

    function handleB1(e) {
        setB1(true)
        setB2(false)
        setB3(false)
        setB4(false)
    }
    function handleB2(e) {
        setB1(false)
        setB2(true)
        setB3(false)
        setB4(false)
    }
    function handleB3(e) {
        setB1(false)
        setB2(false)
        setB3(true)
        setB4(false)
    }
    function handleB4(e) {
        setB1(false)
        setB2(false)
        setB3(false)    
        setB4(true)
    }

     function handleLog(){
        if(userData.userId){
            const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('67efd413003a478100a0')

            const account = new Account(client)
            account.deleteSessions().then((response)=>navigate('/login')).catch()
        }
        else{
            navigate('/login')
        }
    }
    return (
        <div className="w-full min-h-screen bg-[#0F172A] text-[#F8FAFC]">   
            <nav className="bg-[#1E293B] p-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">ByteTodo</h1>
                <button className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] px-5 py-3 rounded-md"
                onClick={handleLog}
                >{userData.userId?<FiLogOut/>:""}{userData.userId?'Logout':"Login"}</button>
            </nav>  

            <div className=" w-full h-[10%] flex flex-col justify-center items-center p-3">

                <div className=" w-full sections overflow-y-auto flex justify-center">
                    <button className={`bg-[#1E293B] px-4 py-3 ml-4 ${b1 ? "bg-[#6D28D9]" : "bg-[#1E293B]"} rounded-xl`}
                        onClick={handleB1}
                    >All</button>
                    
                    <button className={`bg-[#1E293B] px-4 py-3 ml-4 border-2 border-gray-800  rounded-xl`}
                        onClick={()=>setAddSection(true)}
                    ><FiPlus /></button>
                </div>

                <div className="w-full  flex justify-center gap-3 items-center p-3">
                    <input type="text" placeholder="Add a new task..."
                        className="search-bar w-[40%] p-4 rounded-md  bg-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    />

                    <button className="bg-[#7C3AED] hover:bg-[#6D28D9] p-4 rounded-md font-bold text-center">
                        + Add
                    </button>
                </div>

            </div>

            {
                addSection &&

                <div className="fixed bg-black/20 inset-0 backdrop-blur-md flex justify-center items-center z-50">
                <div className="relative w-80 p-5 rounded-2xl shadow-lg bg-[#1E293B]/90 border-2 border-[#334155]">

                    {/* Close Icon */}
                    <button className="absolute top-3 right-3 text-gray-300 hover:text-white" onClick={() =>setAddSection(false)}>
                        <FiX size={20} />
                    </button>

                    <h3 className="text-lg font-semibold mb-4 text-white">Create Section</h3>

                    <label htmlFor="section-name" className="text-sm text-gray-300 mb-1 block">
                        Section Name
                    </label>
                    <input
                        type="text"
                        id="section-name"
                        placeholder="Enter section name"
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none bg-[#0F172A] text-white focus:ring-2 focus:ring-blue-400 mb-4"
                    />

                    <button className="w-full py-2 bg-[#7C3AED] text-white rounded-md hover:bg-[#6D28D9] transition-colors">
                        Add Section
                    </button>
                </div>
            </div>
            }
            <div className=" h-[75vh] w-full flex  flex-col items-center overflow-auto ">
                <TodoItem />
            </div>
        </div>
    )
}

export default Home;