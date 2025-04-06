import React,{useState,useEffect} from "react";
import {client,account,databases} from '../appwrite/config'
import { Query } from "appwrite";

function Section({id,name,activeSection,setActiveSection,setTodos,setActiveSectionId,activeSectionId,loading,setLoading}){

    async function fetchTodos(id){
        setLoading(true)
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                [Query.equal('sectionId',id)]
            )
            console.log('todos',response)
            setTodos(response.documents)
        } catch (error) {
            
        }
        setLoading(false)
    }

    return(
        <button key={id} className={`${activeSection===name?"bg-[#7C3AED] text-white":"bg-[#1E293B] hover:bg-[#334155]"} px-4 py-3 ml-4  rounded-xl`}
        onClick={()=>{fetchTodos(id),setActiveSection(name),setActiveSectionId(id),console.log('active Id',activeSectionId),console.log('active Name',activeSection)}}
    >{name}</button>
    )
}

export default Section;