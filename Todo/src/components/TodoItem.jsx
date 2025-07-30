import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiSave, FiCode, FiX, FiCircle, FiCheckCircle, FiChevronDown, FiChevronRight, FiFileText, FiTerminal, FiGitBranch, FiClock, FiZap, FiEdit2, FiEdit3 } from 'react-icons/fi';
import { client, account, databases } from '../appwrite/config';

function TodoItem({ title = "Hello", status = false, getDescription = "No description", key, sectionId, id, fetchSectionTodos }) {
    const [title1, setTitle1] = useState(title)
    const [isComplete, setIsComplete] = useState(status)
    const [editTitle, setEditTitle] = useState(true)
    const [editDescription, setEditDescription] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [description, setDescription] = useState(getDescription)
    const [tempDescription, setTempDescription] = useState(description)

    const handleUpdate = async (id) => {
        try {
            await databases.updateDocument(
                '67efd6330013881c7e66', // database ID
                '67efd64b00020a82b9d1', // collection ID
                id,                     // document ID
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

    // Generate priority and time estimate (mock data for demo)
    const priority = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
    const timeEstimate = Math.floor(Math.random() * 8) + 1;

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
            case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
            case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    }

    const handleTitleSave = () => {
        setEditTitle(true);
        // Title is automatically saved via useEffect
    };

    const handleTitleCancel = () => {
        setTitle1(title);
        setEditTitle(true);
    };

    const handleDescriptionSave = async() => {
        setDescription(tempDescription);
        setEditDescription(true);
         try {
            await databases.updateDocument(
                '67efd6330013881c7e66', // database ID
                '67efd64b00020a82b9d1', // collection ID
                id,                     // document ID
                {
                    description: tempDescription || "No description",
                    isComplete 
                },
            );
        } catch (error) {
            console.error("Update Error:", error);
        }
    };

    const handleDescriptionCancel = () => {    
        
        setTempDescription(description);
        setEditDescription(true);
    };

    return (
        <div 
            key={key} 
            className={`group relative w-full rounded-2xl backdrop-blur-xl border transition-all duration-300  ${
                isComplete 
                    ? "bg-gradient-to-r from-green-500/5 to-emerald-500/10 border-green-500/20" 
                    : "bg-gradient-to-r from-slate-900/50 to-indigo-900/30 border-white/10 hover:border-indigo-400/30"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                isComplete 
                    ? "bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100"
                    : "bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100"
            }`}></div>

            {/* Main content */}
            <div className="relative p-5">
                <div className="flex items-start space-x-4">
                    {/* Status Checkbox with enhanced design */}
                    <button 
                        className={`relative mt-1 p-2.5 rounded-xl transition-all duration-200 hover:scale-110 group/checkbox ${
                            isComplete 
                                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400 text-green-400 shadow-lg shadow-green-500/20" 
                                : "bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-2 border-gray-500/50 hover:border-indigo-400 text-gray-400 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20"
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
                            <div className="absolute -inset-1 bg-green-400/20 rounded-xl blur opacity-50 animate-pulse"></div>
                        )}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                {!editTitle ? (
                                    <div className="flex items-center space-x-2 flex-1">
                                        <div className="flex items-center space-x-2 bg-gradient-to-r from-slate-900/80 to-indigo-900/40 backdrop-blur-xl rounded-xl px-4 py-3 border-2 border-cyan-400/50 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-400/30 focus-within:shadow-lg focus-within:shadow-cyan-500/20 transition-all duration-300 flex-1">
                                            <FiTerminal className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
                                            <input
                                                type="text"
                                                className="bg-transparent text-cyan-100 font-mono text-sm focus:outline-none flex-1 placeholder-cyan-300/50"
                                                value={title1}
                                                onChange={(e) => setTitle1(e.target.value)}
                                                autoFocus
                                                placeholder="Enter task description..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <FiGitBranch className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                                                isComplete ? "text-green-400" : "text-indigo-400"
                                            }`} />
                                            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                                        </div>
                                        <p className={`font-mono text-sm transition-all duration-200 flex-1 min-w-0 ${
                                            isComplete 
                                                ? "line-through text-green-300/70" 
                                                : "text-transparent bg-gradient-to-r from-cyan-200 via-indigo-200 to-purple-200 bg-clip-text font-medium"
                                        }`}>
                                            {title1}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Task metadata */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {/* Expand/Collapse button */}
                                <button
                                    onClick={() => setShowDescription(!showDescription)}
                                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-800/60 to-indigo-900/40 hover:from-indigo-800/60 hover:to-purple-900/40 border border-indigo-400/20 hover:border-indigo-400/50 transition-all duration-200 group/expand backdrop-blur-xl"
                                    title="Toggle description"
                                >
                                    {showDescription ? (
                                        <FiChevronDown className="w-4 h-4 text-indigo-300 group-hover/expand:text-cyan-300 transition-colors duration-200" />
                                    ) : (
                                        <FiChevronRight className="w-4 h-4 text-indigo-300 group-hover/expand:text-cyan-300 transition-colors duration-200" />
                                    )}
                                    <FiFileText className="w-3 h-3 text-indigo-300 group-hover/expand:text-cyan-300 transition-colors duration-200" />
                                    <span className="text-xs font-mono text-indigo-200 group-hover/expand:text-cyan-200 transition-colors duration-200">
                                        Details
                                    </span>
                                </button>

                                {/* Status indicator */}
                                {isComplete && (
                                    <div className="flex items-center space-x-2 text-xs font-mono text-green-400/70">
                                        <FiZap className="w-3 h-3 animate-pulse" />
                                        <span>Deployed successfully</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className={`flex items-center space-x-2 transition-all duration-200 ${
                                isHovered || !editTitle ? "opacity-100 translate-x-0" : "opacity-60 translate-x-2"
                            }`}>
                                {/* Title Edit Controls */}
                                {editTitle && !isComplete && (
                                    <button
                                        onClick={() => setEditTitle(false)}
                                        className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-110 transition-all duration-200 group/edit backdrop-blur-xl"
                                        title="Edit task title"
                                    >
                                        <FiEdit2 className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-200" />
                                    </button>
                                )}
                                
                                {!editTitle && (
                                    <>
                                        <button
                                            onClick={handleTitleSave}
                                            className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/40 text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-110 transition-all duration-200 group/save backdrop-blur-xl"
                                            title="Save title changes"
                                        >
                                            <FiSave className="w-4 h-4 group-hover/save:scale-110 transition-transform duration-200" />
                                        </button>
                                        <button
                                            onClick={handleTitleCancel}
                                            className="p-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-110 transition-all duration-200 group/cancel backdrop-blur-xl"
                                            title="Cancel title editing"
                                        >
                                            <FiX className="w-4 h-4 group-hover/cancel:rotate-90 transition-transform duration-200" />
                                        </button>
                                    </>
                                )}
                                
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 text-red-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-110 transition-all duration-200 group/delete backdrop-blur-xl"
                                    title="Delete task"
                                >
                                    <FiTrash2 className="w-4 h-4 group-hover/delete:rotate-12 transition-transform duration-200" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Dropdown */}
                {showDescription && (
                    <div className="mt-4 pt-4 border-t border-indigo-400/20">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-lg border-2 border-purple-400/40 flex items-center justify-center backdrop-blur-xl shadow-lg shadow-purple-500/20">
                                <FiFileText className="w-4 h-4 text-purple-200" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-cyan-200 bg-clip-text font-mono">
                                        Task Specification
                                    </h4>
                                    
                                    {/* Description Edit Controls */}
                                    <div className="flex items-center space-x-2">
                                        {editDescription && (
                                            <button
                                                onClick={() => setEditDescription(false)}
                                                className="p-1.5 rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/40 text-violet-300 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-110 transition-all duration-200 group/edit-desc backdrop-blur-xl"
                                                title="Edit description"
                                            >
                                                <FiEdit3 className="w-3.5 h-3.5 group-hover/edit-desc:rotate-12 transition-transform duration-200" />
                                            </button>
                                        )}
                                        
                                        {!editDescription && (
                                            <>
                                                <button
                                                    onClick={handleDescriptionSave}
                                                    className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/40 text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-110 transition-all duration-200 group/save-desc backdrop-blur-xl"
                                                    title="Save description"
                                                >
                                                    <FiSave className="w-3.5 h-3.5 group-hover/save-desc:scale-110 transition-transform duration-200" />
                                                </button>
                                                <button
                                                    onClick={handleDescriptionCancel}
                                                    className="p-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-110 transition-all duration-200 group/cancel-desc backdrop-blur-xl"
                                                    title="Cancel description editing"
                                                >
                                                    <FiX className="w-3.5 h-3.5 group-hover/cancel-desc:rotate-90 transition-transform duration-200" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="rounded-xl bg-gradient-to-br from-slate-900/80 via-indigo-950/60 to-purple-950/40 border-2 border-indigo-400/20 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
                                    {editDescription ? (
                                        <div className="p-4">
                                            <p className="text-sm text-transparent bg-gradient-to-r from-slate-200 via-indigo-200 to-purple-200 bg-clip-text font-mono leading-relaxed">
                                                {description}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-4">
                                            <div className="flex items-start space-x-3">
                                                <FiTerminal className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1 animate-pulse" />
                                                <textarea
                                                    value={tempDescription}
                                                    onChange={(e) => setTempDescription(e.target.value)}
                                                    className="w-full bg-transparent text-purple-100 font-mono text-sm focus:outline-none resize-none min-h-[80px] placeholder-purple-300/50 leading-relaxed"
                                                    placeholder="Enter detailed task specification..."
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hover glow effect */}
            <div className={`absolute -inset-0.5 rounded-2xl blur-sm opacity-0 transition-opacity duration-300 pointer-events-none ${
                isComplete 
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 group-hover:opacity-100"
                    : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:opacity-100"
            }`}></div>

            {/* Border glow animation */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                isHovered && !isComplete
                    ? "shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                    : ""
            }`}></div>
        </div>
    )
}

export default TodoItem;