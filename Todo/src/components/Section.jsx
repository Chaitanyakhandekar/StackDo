import React, { useState } from "react";
import { Query } from "appwrite";
import { client, account, databases } from '../appwrite/config';
import { FiX, FiFolder, FiFolderPlus , FiTrash2, FiLoader } from 'react-icons/fi';
import Swal from 'sweetalert2';

function Section({ id, name, activeSection, setActiveSection, setTodos, setActiveSectionId, fetchAllTodos, activeSectionId, loading, setLoading, setSectionDeleted, setSections, sections }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function fetchTodos(id) {
        setLoading(true)
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                [Query.equal('sectionId', id)]
            )
            console.log('Fetched Todos for section:', name, response.documents)
            setTodos(response.documents)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    async function deleteSection() {
        setIsDeleting(true);
        setLoading(true);
        try {
            let response = await databases.listDocuments(
                '67efd6330013881c7e66',
                '67efd64b00020a82b9d1',
                [Query.equal('sectionId', id)]
            )

            response.documents.map(async (todo) => {
                console.log('Deleting Todo with id = ', todo.$id)
                await databases.deleteDocument(
                    '67efd6330013881c7e66',
                    '67efd64b00020a82b9d1',
                    todo.$id
                )
            })

            await databases.deleteDocument(
                '67efd6330013881c7e66',
                '67efdb22002e63541958',
                id
            )
            await fetchAllTodos()
            await setActiveSection('All')

            setSections((sections) => sections.filter((section) => section.name !== name))
            console.log(`Section ${name} deleted Successfully`)
            console.log('documents to delete =======', response)
        } catch (error) {
            console.log('DeleteSection :: Error :: ', error)
        }
        setIsDeleting(false);
        setLoading(false)
    }

    function handleDelete(e) {
        e.stopPropagation(); // Prevent section selection when clicking delete
        console.log('current Section to delete is ', name)

        // Custom SweetAlert styling for dark theme
        Swal.fire({
            title: 'Terminate Module?',
            html: `<p style="color: #94A3B8; font-family: 'Courier New', monospace;">This will permanently delete the <strong style="color: #F59E0B;">"${name}"</strong> module and all its tasks.</p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, terminate it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            focusCancel: true,
            background: '#1E293B',
            color: '#F8FAFC',
            customClass: {
                popup: 'border border-gray-600 rounded-2xl',
                title: 'text-red-400 font-bold',
                confirmButton: 'rounded-xl px-6 py-2 font-semibold',
                cancelButton: 'rounded-xl px-6 py-2 font-semibold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Deleting Section ', name)
                deleteSection().then().catch()
            }
        });
    }

    const isActive = activeSection === name;

    return (
        <div 
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className={`absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-red-500 border-2 border-red-400 flex items-center justify-center transition-all duration-200 ${
                    isHovered && !isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                } hover:bg-red-600 hover:scale-110`}
                title={`Delete ${name} module`}
            >
                {isDeleting ? (
                    <FiLoader className="w-3 h-3 text-white animate-spin" />
                ) : (
                    <FiX className="w-3 h-3 text-white" />
                )}
            </button>

            {/* Main Section Button */}
            <button
                key={id}
                className={`group relative px-6 py-3 mx-1 sm:ml-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                        : "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-indigo-400/50 text-gray-300 hover:text-white hover:scale-102"
                }`}
                onClick={() => {
                    fetchTodos(id);
                    setActiveSection(name);
                    setActiveSectionId(id);
                }}
                disabled={isDeleting}
            >
                {/* Module Icon */}
                {isActive ? (
                    <FiFolderPlus  className="w-4 h-4 text-white" />
                ) : (
                    <FiFolder className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors duration-200" />
                )}
                
                {/* Module Name */}
                <span className="text-sm sm:text-base font-mono">
                    {name}
                </span>

                {/* Loading indicator */}
                {loading && isActive && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}

                {/* Active glow effect */}
                {isActive && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl blur opacity-30 -z-10"></div>
                )}

                {/* Hover glow effect */}
                {!isActive && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                )}
            </button>

            {/* Bottom indicator for active state */}
            {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
            )}

            {/* Connection line effect (optional - for showing module relationships) */}
            {isActive && (
                <div className="absolute top-1/2 -left-2 w-2 h-0.5 bg-gradient-to-r from-transparent to-indigo-400"></div>
            )}
        </div>
    )
}

export default Section;