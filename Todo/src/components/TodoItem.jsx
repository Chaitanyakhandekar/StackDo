import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiSave, FiCode, FiX, FiCircle, FiCheckCircle } from 'react-icons/fi';
import { client, account, databases } from '../appwrite/config';

function TodoItem({ title = "Hello", status = false, key, sectionId, id, fetchSectionTodos }) {
    const [title1, setTitle1] = useState(title)
    const [isComplete, setIsComplete] = useState(status)
    const [edit, setEdit] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const handleUpdate = async (id) => {
        try {
            await databases.updateDocument(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                id,
                {
                    title: title1,
                    isComplete
                }
            );
        } catch (error) {
            console.error("Update Error:", error);
        }
    };

    async function handleDelete(id) {
        try {
            await databases.deleteDocument(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                id
            )
            fetchSectionTodos()
        } catch (error) {
            console.log('Error = ', error)
        }
    }

    useEffect(() => {
        handleUpdate(id)
    }, [title1, isComplete])

    return (
        <div 
            key={key} 
            className={`group w-full p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                isComplete 
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 hover:shadow-green-500/20" 
                    : "bg-gradient-to-r from-white/5 to-white/10 border-white/20 hover:border-indigo-400/50 hover:shadow-indigo-500/20"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center space-x-4">
                {/* Status Indicator */}
                <button 
                    className={`relative p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                        isComplete 
                            ? "bg-green-500/20 border-2 border-green-400 text-green-400" 
                            : "bg-white/10 border-2 border-gray-500 hover:border-indigo-400 text-gray-400 hover:text-indigo-400"
                    }`}
                    onClick={() => setIsComplete((stat) => !stat)}
                    title={isComplete ? "Mark as incomplete" : "Mark as complete"}
                >
                    {isComplete ? (
                        <FiCheckCircle className="w-5 h-5" />
                    ) : (
                        <FiCircle className="w-5 h-5" />
                    )}
                    {isComplete && (
                        <div className="absolute -inset-1 bg-green-400/30 rounded-xl blur opacity-50"></div>
                    )}
                </button>

                {/* Task Content */}
                <div className="flex-1 relative">
                    {!edit ? (
                        <div className="flex items-center space-x-2">
                            <FiCode className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                            <input
                                type="text"
                                className="flex-1 bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white font-mono focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200"
                                value={title1}
                                onChange={(e) => setTitle1(e.target.value)}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <FiCode className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                                isComplete ? "text-green-400" : "text-gray-500"
                            }`} />
                            <p className={`font-mono text-sm transition-all duration-200 ${
                                isComplete 
                                    ? "line-through text-green-300/70" 
                                    : "text-gray-200"
                            }`}>
                                {title1}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className={`flex items-center space-x-2 transition-all duration-200 ${
                    isHovered || !edit ? "opacity-100" : "opacity-50"
                }`}>
                    {edit && !isComplete && (
                        <button
                            onClick={() => setEdit(false)}
                            className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 hover:scale-110 transition-all duration-200"
                            title="Edit task"
                        >
                            <FiEdit className="w-4 h-4" />
                        </button>
                    )}
                    
                    {!edit && (
                        <>
                            <button
                                onClick={() => setEdit(true)}
                                className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 hover:scale-110 transition-all duration-200"
                                title="Save changes"
                            >
                                <FiSave className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    setTitle1(title)
                                    setEdit(true)
                                }}
                                className="p-2 rounded-lg bg-gray-500/20 border border-gray-500/30 text-gray-400 hover:bg-gray-500/30 hover:scale-110 transition-all duration-200"
                                title="Cancel editing"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </>
                    )}
                    
                    <button
                        onClick={() => handleDelete(id)}
                        className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-200"
                        title="Delete task"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Progress indicator for completed tasks */}
            {isComplete && (
                <div className="mt-3 flex items-center space-x-2 text-xs font-mono text-green-400/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Task completed successfully</span>
                </div>
            )}

            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 transition-opacity duration-300 pointer-events-none ${
                isComplete 
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 group-hover:opacity-100"
                    : "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 group-hover:opacity-100"
            }`}></div>
        </div>
    )
}

export default TodoItem;