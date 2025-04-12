import React from "react";

function CloseIcon({ position , onClick,activeSection,name}) {
    return (
       <>
            {activeSection===name  &&
                 <svg 
                 xmlns="http://www.w3.org/2000/svg" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 strokeWidth={2} 
                 stroke="currentColor" 
                 onClick={onClick}
                 className={`size-5 bg-red-500 hover:bg-red-600 rounded-full absolute top-[-10%] right-[-5%] p-1 text-white font-bold cursor-pointer transition-colors duration-200 shadow-md hover:shadow-lg`}
             >
                 <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     d="M6 18L18 6M6 6l12 12" 
                 />
             </svg>

}
            <h1></h1>
       </>
    )
}

export default CloseIcon;