import React from "react";
import { Query } from "appwrite";
import { client, account, databases } from '../appwrite/config'

function Section({ id, name, activeSection, setActiveSection, setTodos, setActiveSectionId, activeSectionId, loading, setLoading }) {

    async function fetchTodos(id) {
        setLoading(true)
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                [Query.equal('sectionId', id)]
            )
            setTodos(response.documents)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    return (
        <button 
            key={id} 
            className={`${
                activeSection === name ? "bg-[#7C3AED] text-white" : "bg-[#1E293B] hover:bg-[#334155]"
            } px-3 py-2 mx-1 sm:px-4 sm:py-3 sm:ml-4 rounded-xl text-sm sm:text-base`}
            onClick={() => {
                fetchTodos(id);
                setActiveSection(name);
                setActiveSectionId(id);
            }}
        >
            {name}
        </button>
    )
}

export default Section;