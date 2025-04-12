import React from "react";
import { Query } from "appwrite";
import { client, account, databases } from '../appwrite/config'
import CloseIcon from "./CloseIcon";
import Swal from 'sweetalert2';

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

    async function deleteSection(){
        console.log('current Section to delete is ',name)

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete the "${name}" section?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            focusCancel: true
        }).then((result) => {
            if (result.isConfirmed) {
                let deleteSection = true;
                // Proceed with deletion logic here
            }
        });
    }

    return (
       <div className="relative">
       <CloseIcon position={'absolute'} onClick={deleteSection} activeSection={activeSection} name={name}/>
        <button 
            key={id} 
            className={`${
                activeSection === name ? "bg-[#7C3AED] text-white" : "bg-[#1E293B] hover:bg-[#334155]"
            } px-3 py-2 mx-1 sm:px-4 sm:py-3 sm:ml-4 rounded-xl text-sm sm:text-base `}
            onClick={() => {
                fetchTodos(id);
                setActiveSection(name);
                setActiveSectionId(id);
            }}
        >
            {name}
        </button>
       </div>
    )
}

export default Section;