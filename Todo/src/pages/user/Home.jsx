import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut, FiEdit, FiTrash2, FiPlus, FiX, FiCode, FiLayers, FiCommand, FiZap, FiCpu } from 'react-icons/fi';
import TodoItem from "../../components/TodoItem";
import { useNavigate } from "react-router";
import { Client, Account, Databases, ID } from 'appwrite';
import { client, account, databases } from '../../appwrite/config';
import { setUserData } from "../../store/userSlice/userSlice";
import { Query } from "appwrite";
import Section from "../../components/Section";
import Swal from 'sweetalert2';

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
    const [sectionDeleted,setSectionDeleted] = useState(false)

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
            fetchSectionTodos()
            setTitle("")
        }
    }

    if (!authVerified) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-ping"></div>
                </div>
                
                <div className="flex flex-col items-center space-y-6 z-10 backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10">
                    {/* Logo/Icon */}
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                            <FiCommand className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur opacity-50 animate-pulse"></div>
                    </div>
                    
                    {/* Animated spinner */}
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-indigo-500 border-opacity-80 rounded-full animate-spin"></div>
                    </div>
                    
                    {/* Text with animation */}
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-pulse">
                            Initializing StackDo
                        </h2>
                        <p className="text-gray-400 font-mono text-sm">
                            Authenticating workspace session...
                        </p>
                    </div>
                    
                    {/* Progress indicators */}
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
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

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white font-mono relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-20 backdrop-blur-xl bg-black/20 border-b border-white/10 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FiCode className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                StackDo
                            </h1>
                            <p className="text-xs text-gray-400 font-mono">Developer Workspace</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-400">Connected</span>
                        </div>
                        
                        {!userId1 ? (
                            <button
                                className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                                onClick={handleLogin}
                            >
                                <span className="relative z-10">Initialize Session</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            </button>
                        ) : (
                            <button
                                className="group relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 flex items-center space-x-2"
                                onClick={logout}
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span className="relative z-10">Terminate</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <FiLayers className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-xl font-bold text-gray-200">Project Modules</h2>
                    </div>
                    <p className="text-gray-400 text-sm font-mono">Organize your development tasks by modules and features</p>
                </div>

                {/* Sections */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
                        <button
                            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                                activeSection === 'All' 
                                ? "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25" 
                                : "bg-white/10 hover:bg-white/20 border border-white/20"
                            }`}
                            onClick={() => {setActiveSection('All'), fetchAllTodos(userId1)}}
                        >
                            <FiCpu className="w-4 h-4" />
                            <span>All Modules</span>
                            {activeSection === 'All' && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30"></div>
                            )}
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
                                fetchAllTodos={fetchAllTodos}
                                setSectionDeleted={setSectionDeleted}
                                setSections={setSections}
                            />
                        ))}

                        <button
                            className="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-2 border-dashed border-white/30 hover:border-indigo-400 hover:bg-indigo-500/10 flex items-center space-x-2"
                            onClick={() => setAddSection(true)}
                            title="Create new module"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span className="hidden sm:inline">New Module</span>
                        </button>
                    </div>
                </div>

                {/* Add Task Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <FiZap className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-bold text-gray-200">Quick Add</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="What needs to be built today?"
                                className="w-full p-4 rounded-xl bg-black/30 border border-white/20 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200 font-mono text-white placeholder-gray-400"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                        </div>

                        <button
                            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 flex items-center justify-center space-x-2"
                            onClick={addTodo}
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Deploy Task</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Section Modal */}
            {addSection && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAddSection(false)}></div>
                    
                    <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl">
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                            onClick={() => setAddSection(false)}
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <FiLayers className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Create Module</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Module Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Authentication, API, Frontend"
                                    value={sectionName}
                                    onChange={(e) => setSectionName(e.target.value)}
                                    className="w-full p-4 rounded-xl bg-black/30 border border-white/20 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200 font-mono"
                                />
                            </div>

                            <button
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                                onClick={createSection}
                            >
                                Initialize Module
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Todo List */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
                <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-bold">
                                    {activeSection === 'All' ? 'All Tasks' : `${activeSection} Tasks`}
                                </h3>
                                <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                                    <span className="text-sm font-mono text-indigo-300">
                                        {todos.filter(todo => todo.userId === userId1).length} items
                                    </span>
                                </div>
                            </div>
                            
                            {loading && (
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                                    <span className="text-sm font-mono">Syncing...</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="max-h-[60vh] overflow-y-auto w-full">
                        <div className="p-1 space-y-3">
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
                            
                            {todos.length === 0 && !loading && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                                        <FiCode className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-400 mb-2">No tasks in this module</h4>
                                    <p className="text-gray-500 font-mono text-sm">Start by adding your first development task above</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;