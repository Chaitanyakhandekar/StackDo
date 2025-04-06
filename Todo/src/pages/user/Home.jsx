import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FiLogOut, FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import '../../App.css'
import TodoItem from "../../components/TodoItem";
import { useNavigate } from "react-router";
import {Client,Account,Databases,ID} from 'appwrite'
import { client, account, databases} from '../../appwrite/config'
import { setUserData } from "../../store/userSlice/userSlice";
import { Query } from "appwrite";
import Section from "../../components/Section";


function Home() {
    let userData = useSelector((state) => state.userData)
    const dispatch = useDispatch()
    const [b1, setB1] = useState(true)
    const [b2, setB2] = useState(false)
    const [b3, setB3] = useState(false)
    const [b4, setB4] = useState(false)
    const [addSection,setAddSection] = useState(false)
    const [sectionName,setSectionName] = useState("")
    const [activeSection,setActiveSection] = useState('All')
    const [activeSectionId,setActiveSectionId] = useState('All')
    const [todos,setTodos] = useState([])
    const [backupTodos,setBackupTodos] = useState([])
    const [sectionTodods,setSectionTodos] = useState([])
    const [sections,setSections] = useState([])
    const [title,setTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const [userId1,setUserId1] = useState("")
    

    const navigate = useNavigate()

    async function fetchSections(userId){   //! fetching sections
        
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efdb22002e63541958' , 
                [Query.equal('userId',userId)]
            )
            console.log('sections = ',response.documents)
            setSections(response.documents)
        } catch (error) {
            console.log(error)
        }
        
    }

    async function fetchAllTodos(userId){
        setLoading(true)
        let response = await databases.listDocuments(
            '67efd6330013881c7e66',
            '67efd64b00020a82b9d1',
            [Query.equal("userId",userId)]
        )
        console.log('All todos = ',response)
        setTodos(response.documents)
        setLoading(false)
    }

    async function fetchSectionTodos(){
            setLoading(true)
            try {
                let response = await databases.listDocuments(
                    '67efd6330013881c7e66',
                    '67efd64b00020a82b9d1',
                    [Query.equal('sectionId',activeSectionId)]
                )
                console.log('todos',response)
                setTodos(response.documents)
            } catch (error) {
                
            }
            setLoading(false)
        }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setUserId1(userId)
        const appwriteUserId = localStorage.getItem('appwriteUserId');
        const createdAt = localStorage.getItem('createdAt');
        const updatedAt = localStorage.getItem('updatedAt');
    
        if (userId && appwriteUserId) {
            fetchSections(userId).then().catch((error)=>console.log(error))
            
          dispatch(
            setUserData({
              userId,
              appwriteUserId,
              createdAt,
              updatedAt,
            })
          );
        }
        fetchAllTodos(userId)
        
      }, []);

      useEffect(() => {
        
        console.log('after reftesh : ',userData)
      }, [userData]);

    

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
            
            account.deleteSessions().then((response)=>navigate('/login')).catch()
        }
        else{
            navigate('/login')
        }
    }

    
   async function createSection(){
    console.log(userData)
        const response = await databases.createDocument(
            '67efd6330013881c7e66',
            '67efdb22002e63541958' , 
            ID.unique(),
            {
                name:sectionName,
                userId:userData.userId
            }
        )
        console.log(response)
        fetchSections(userData.userId).then()
        setAddSection(false)
    }

    async function addTodo(){
        let response = await databases.createDocument(
            '67efd6330013881c7e66',
            '67efd64b00020a82b9d1',
            ID.unique(),
            {
                title,
                sectionId:activeSection==='All'?"All":activeSectionId,
                userId:userData.userId,
                isComplete:false
            }   
        )
        if(response){
            alert('todo added successfully')
            fetchSectionTodos()
            setTitle("")
        }
    }   


    return (
        <div className="w-full min-h-screen bg-[#0F172A] text-[#F8FAFC] font-urban">   
            <nav className="bg-[#1E293B] p-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">ByteTodo</h1>
                <button className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] px-5 py-3 rounded-md"
                onClick={handleLog}
                >{userData.userId?<FiLogOut/>:""}{userData.userId?'Logout':"Login"}</button>
            </nav>  

            <div className=" w-full h-[10%] flex flex-col justify-center items-center p-3">

                <div className=" w-full sections overflow-y-auto flex justify-center">
                    <button className={`bg-[#1E293B] px-4 py-3 ml-4 ${activeSection==='All' ? "bg-[#6D28D9]" : "bg-[#1E293B]"} rounded-xl`}
                        onClick={()=>{fetchAllTodos(userId1),setActiveSection('All')}}
                    >All</button>

                    {
                        sections.map((section)=>(
                            <Section id={section.$id} name={section.name} activeSection={activeSection} setActiveSection={setActiveSection} setTodos={setTodos} setActiveSectionId={setActiveSectionId} activeSectionId={activeSectionId} loading={loading} setLoading={setLoading}/>
                        ))
                    }
                    
                    <button className={` px-4 py-3 ml-4 border-2 border-gray-800  rounded-xl ${activeSection==='All'?"bg-[#7C3AED] text-white":"bg-[#1E293B] hover:bg-[#334155]"}`}
                        onClick={()=>{setAddSection(true),setActiveSection('Add'),setActiveSectionId('All')}}
                        title="Add section"
                    ><FiPlus /></button>
                </div>

                <div className="w-full  flex justify-center gap-3 items-center p-3">
                    <input type="text" placeholder="Add a new task..."
                        className="search-bar w-[40%] p-4 rounded-md  bg-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                    <button className="bg-[#7C3AED] hover:bg-[#6D28D9] p-4 rounded-md font-bold text-center"
                     title="Add todo"
                     onClick={addTodo}
                     >
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
                        value = {sectionName}
                        onChange={(e)=>setSectionName(e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none bg-[#0F172A] text-white focus:ring-2 focus:ring-blue-400 mb-4"
                    />

                    <button className="w-full py-2 bg-[#7C3AED] text-white rounded-md hover:bg-[#6D28D9] transition-colors"
                    onClick={createSection}
                    >
                        Add Section
                    </button>
                </div>
            </div>
            }
            <div className=" h-[75vh] w-full flex  flex-col items-center overflow-auto ">
                {
                    todos && !loading &&
                    todos.map((todo)=>(
                        <TodoItem key={todo.$id} title={todo.title} status={todo.isComplete} sectionId={todo.sectionId} id={todo.$id}/>
                    ))
                    
                }
                {
                    loading &&  <h1 className="text-gray-400 font-bold">Loading...</h1>
                }
                {
                    todos.length===0 && !loading && <h1 className="text-gray-400 font-bold">No todos created in this section....</h1>
                }
            </div>
        </div>
    )
}

export default Home;