import React, { useState } from "react";
import { FiX, FiTrash2, FiLoader } from 'react-icons/fi';

function CloseIcon({ position, onClick, activeSection, name, isDeleting }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {activeSection === name && (
                <button
                    onClick={onClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={isDeleting}
                    className={`absolute -top-2 -right-2 z-20 w-7 h-7 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        isDeleting 
                            ? "bg-gray-500 cursor-not-allowed" 
                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-110 active:scale-95"
                    } border-2 border-red-400 shadow-lg hover:shadow-red-500/50`}
                    title={isDeleting ? "Terminating module..." : `Terminate ${name} module`}
                >
                    {/* Background glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur opacity-0 transition-opacity duration-300 ${
                        isHovered && !isDeleting ? "opacity-50" : ""
                    }`}></div>
                    
                    {/* Icon */}
                    <div className="relative z-10">
                        {isDeleting ? (
                            <FiLoader className="w-4 h-4 text-white animate-spin" />
                        ) : isHovered ? (
                            <FiTrash2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                            <FiX className="w-4 h-4 text-white font-bold" />
                        )}
                    </div>

                    {/* Pulse animation for active state */}
                    {!isDeleting && (
                        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
                    )}

                    {/* Inner highlight */}
                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-t from-transparent to-white/20"></div>
                </button>
            )}
        </>
    )
}

export default CloseIcon;