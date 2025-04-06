import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiDownload } from 'react-icons/fi'
import { client, account, databases } from '../appwrite/config'

function TodoItem({ title = "Hello", status = false, key, sectionId, id, fetchSectionTodos }) {
    const [title1, setTitle1] = useState(title)
    const [isComplete, setIsComplete] = useState(status)
    const [edit, setEdit] = useState(true)

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
        <div key={key} className={`w-full md:w-[40%] lg:w-[40%] h-16 p-3 rounded-md flex justify-between items-center my-2 ${
            isComplete ? "bg-[#2C3A4D]" : "bg-[#2ec5f341]"
        }`}>
            <button 
                className={`${isComplete ? "border-green-400" : ""} w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center`}
                onClick={() => setIsComplete((stat) => !stat)}
                title="mark as complete"
            >
                {isComplete ? <FiCheck className="text-green-500 font-bold" /> : null}
            </button>

            <input
                type="text"
                className={`${!edit ? "border-2" : ""} h-full text-white font-bold bg-transparent outline-none rounded-md w-[60%] mx-2 ${
                    isComplete ? "line-through" : ""
                }`}
                readOnly={edit}
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
            />

            <div className="flex justify-center gap-3">
                {edit && !isComplete && (
                    <FiEdit 
                        title="Edit" 
                        className="text-orange-400 hover:cursor-pointer text-lg" 
                        onClick={() => setEdit(false)}
                        size={20}
                    />
                )}
                {!edit && (
                    <FiDownload 
                        onClick={() => setEdit(true)} 
                        className="text-white hover:cursor-pointer text-lg"
                        size={20}
                    />
                )}
                <FiTrash2 
                    onClick={() => handleDelete(id)} 
                    className="text-red-600 hover:cursor-pointer text-lg" 
                    title="Delete todo"
                    size={20}
                />
            </div>
        </div>
    )
}

export default TodoItem;