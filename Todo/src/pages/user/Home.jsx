import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut, FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import '../../App.css'
import TodoItem from "../../components/TodoItem";
import { useNavigate } from "react-router";
import { Client, Account, Databases, ID } from 'appwrite'
import { client, account, databases } from '../../appwrite/config'
import { setUserData } from "../../store/userSlice/userSlice";
import { Query } from "appwrite";
import Section from "../../components/Section";
import Swal from 'sweetalert2';
import './animation.css'

function Home() {
    let userData = useSelector((state) => state.userData)
    const dispatch = useDispatch()
    const [b1, setB1] = useState(true)
    const [b2, setB2] = useState(false)
    const [b3, setB3] = useState(false)
    const [b4, setB4] = useState(false)
    const [addSection, setAddSection] = useState(false)
    const [sectionName, setSectionName] = useState("")
    const [activeSection, setActiveSection] = useState('All')
    const [activeSectionId, setActiveSectionId] = useState('All')
    const [todos, setTodos] = useState([])
    const [backupTodos, setBackupTodos] = useState([])
    const [sectionTodods, setSectionTodos] = useState([])
    const [sections, setSections] = useState([])
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId1, setUserId1] = useState("")
    const [authVerified, setAuthVerified] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await account.get(); // Verify current session
                setAuthVerified(true);
            } catch (error) {
                navigate('/login');
            }
        };
        verifyAuth();
    }, []);


    const navigate = useNavigate()

    async function fetchSections(userId) {   //! fetching sections

        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efdb22002e63541958',
                [Query.equal('userId', userId)]
            )
            console.log('sections = ', response.documents)
            setSections(response.documents)
        } catch (error) {
            console.log(error)
        }

    }

    async function fetchAllTodos(userId) {
        setLoading(true);
        try {
            let queries = [Query.equal("userId", userId)]
            if(activeSection!=='All'){
                queries.push(Query.equal("sectionId", activeSectionId))
            }
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
               queries
            );
            setTodos(response.documents);
        } catch (error) {
            console.error("Fetch error:", error);
        }
        setLoading(false);
    }

    async function fetchSectionTodos() {
        setLoading(true)
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                [Query.equal('sectionId', activeSectionId)]
            )
            console.log('todos', response)
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
            fetchSections(userId).then().catch((error) => console.log(error))

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

        console.log('after reftesh : ', userData)
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

    function handleLogin() {
        navigate('/login')

    }

    async function logout() {
        try {
            await account.deleteSession('current'); // This deletes the current active session
            setUserId1('')
            localStorage.removeItem('userId');
            localStorage.removeItem('appwriteUserId');
            localStorage.removeItem('createdAt');
            localStorage.removeItem('updatedAt');

            dispatch(setUserData({
                userId: null,
                appwriteUserId: null,
                createdAt: null,
                updatedAt: null,
            }));

            Swal.fire({
                title: 'Logout Successful!',
                text: `Loging out..!`,
                icon: 'success',
                confirmButtonText: 'Continue',
                timer: 2000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true
            });
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error);
            Swal.fire({
                title: 'Logout Failed!',
                text: 'Something went wrong while logging out.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                timer: 2500,
                showConfirmButton: true,
                position: 'top-end',
                toast: true
            });

        }
    }

    async function createSection() {
        console.log(userData)
        const response = await databases.createDocument(
            '67efd6330013881c7e66',
            '67efdb22002e63541958',
            ID.unique(),
            {
                name: sectionName,
                userId: userData.userId
            }
        )
        console.log(response)
        fetchSections(userData.userId).then()
        setAddSection(false)
    }

    async function addTodo() {
        let response = await databases.createDocument(
            '67efd6330013881c7e66',
            '67efd64b00020a82b9d1',
            ID.unique(),
            {
                title,
                sectionId: activeSection === 'All' ? "All" : activeSectionId,
                userId: userData.userId,
                isComplete: false
            }
        )
        if (response) {
            // alert('todo added successfully')
            fetchSectionTodos()
            setTitle("")
        }
    }

    if (!authVerified) {
        return (
          <div className="w-full min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Animated spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#7C3AED] border-opacity-30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-[#7C3AED] border-opacity-80 rounded-full animate-spin"></div>
              </div>
              
              {/* Text with animation */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-[#F8FAFC] animate-pulse">
                  Securing Your Workspace
                </h2>
                <p className="text-[#94A3B8]">
                  Just a moment while we verify your session...
                </p>
              </div>
              
              {/* Optional progress bar */}
              <div className="w-48 bg-[#334155] rounded-full h-1.5">
                <div className="bg-[#7C3AED] h-1.5 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        );
      }

    if (!userId1) {
        return (
            <>
                <h1>Please login to view todos....</h1>
                {navigate('/login')}
            </>
        )
    }
    else {
        console.log('user Id 1 = ', userId1)
    }
    return (
        <div className="w-full min-h-screen bg-[#0F172A] text-[#F8FAFC] font-urban">
            <nav className="bg-[#1E293B] p-3 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold">ByteTodo</h1>
                {!userId1 ? (
                    <button
                        className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] px-3 py-2 sm:px-5 sm:py-3 rounded-md text-sm sm:text-base"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                ) : (
                    <button
                        className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] px-3 py-2 sm:px-5 sm:py-3 rounded-md text-sm sm:text-base"
                        onClick={logout}
                    >
                        <FiLogOut className="mr-1" /> Logout
                    </button>
                )}
            </nav>

            <div className="w-full flex flex-col justify-center items-center p-2 sm:p-3">
                {/* Sections */}
                <div className="w-full sections overflow-x-auto whitespace-nowrap py-3 px-1">
                    <div className="inline-flex">
                        <button
                            className={`bg-[#1E293B] px-3 py-2 mx-1 sm:px-4 sm:py-3 sm:ml-4 ${activeSection === 'All' ? "bg-[#6D28D9]" : "bg-[#1E293B]"
                                } rounded-xl text-sm sm:text-base`}
                            onClick={() => { fetchAllTodos(userId1), setActiveSection('All') }}
                        >
                            All
                        </button>

                        {sections.map((section) => (
                            <Section
                                key={section.$id}
                                id={section.$id}
                                name={section.name}
                                activeSection={activeSection}
                                setActiveSection={setActiveSection}
                                setTodos={setTodos}
                                setActiveSectionId={setActiveSectionId}
                                activeSectionId={activeSectionId}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        ))}

                        <button
                            className="px-3 py-2 mx-1 sm:px-4 sm:py-3 sm:ml-4 border-2 border-gray-800 rounded-xl 
                               bg-[#1E293B] hover:bg-[#334155] text-sm sm:text-base"
                            onClick={() => { setAddSection(true) }}
                            title="Add section"
                        >
                            <FiPlus />
                        </button>
                    </div>
                </div>

                {/* Add Todo Input */}
                <div className="w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 items-center p-2 sm:p-3 mt-2">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="search-bar w-full sm:w-[40%] p-3 sm:p-4 rounded-md bg-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] h-12"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] p-3 sm:p-4 rounded-md font-bold text-center w-full sm:w-auto h-12"
                        title="Add todo"
                        onClick={addTodo}
                    >
                        + Add
                    </button>
                </div>
            </div>

            {/* Add Section Modal */}
            {addSection && (
                <div className="fixed bg-black/20 inset-0 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="relative w-11/12 sm:w-80 p-4 sm:p-5 rounded-2xl shadow-lg bg-[#1E293B]/90 border-2 border-[#334155]">
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-white"
                            onClick={() => setAddSection(false)}
                        >
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
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none bg-[#0F172A] text-white focus:ring-2 focus:ring-blue-400 mb-4"
                        />

                        <button
                            className="w-full py-2 bg-[#7C3AED] text-white rounded-md hover:bg-[#6D28D9] transition-colors"
                            onClick={createSection}
                        >
                            Add Section
                        </button>
                    </div>
                </div>
            )}

            {/* Todo List */}
            <div className="h-[60vh] sm:h-[65vh] w-full flex flex-col items-center overflow-y-auto p-2 sm:p-4 mt-2">
                <div className="w-full flex flex-col items-center gap-3">
                    {todos && !loading && (
                        todos.map((todo) => (
                            todo.userId === userId1 && (
                                <TodoItem
                                    key={todo.$id}
                                    title={todo.title}
                                    status={todo.isComplete}
                                    sectionId={todo.sectionId}
                                    id={todo.$id}
                                    fetchSectionTodos={fetchSectionTodos}
                                />
                            )
                        ))
                    )}
                    {loading && <h1 className="text-gray-400 font-bold py-4">Loading...</h1>}
                    {todos.length === 0 && !loading && <h1 className="text-gray-400 font-bold py-4">No todos created in this section....</h1>}
                </div>
            </div>
        </div>
    )
}

export default Home;