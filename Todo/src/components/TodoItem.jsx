import React,{useState} from "react";
import {FiEdit,FiTrash2 ,FiCheck ,FiDownload } from 'react-icons/fi'
 
function TodoItem({title="Hello",status=false ,key,sectionId,id}){
    const [title1,setTitle1] = useState(title)
    const [isComplete,setIsComplete] = useState(status)
    const [edit,setEdit] = useState(true)
    
    return(
        <div key={key} className={` w-1/2 h-[10%]  rounded-md flex justify-around mt-3 items-center ${isComplete?"bg-[#2C3A4D]":"bg-[#2ec5f341]"} `}>
            <button className={` ${isComplete?"border-green-400":"p-2"} border-2 border-gray-400 rounded-md`}
            onClick={()=>setIsComplete((stat)=>!stat)}
            title="mark as complete"
            >
                {/* TODO */}
                {isComplete?<FiCheck className="text-green-500  font-bold rounded-md"/>:""}
            </button>
            
            <input type="text" 
            className={` ${!edit?"border-2":""} h-[90%] text-white font-bold bg-transparent outline-none rounded-md w-[85%] ${isComplete?"line-through":""}`}
            readOnly={edit}
            value={title1}
            onChange={(e)=>setTitle1(e.target.value)}
            />

            <div className="flex justify-center gap-2 w-[6%]">
           {
            edit && !isComplete &&  <FiEdit title="Edit" className="text-orange-400 hover:cursor-pointer text-2md" onClick={()=>{setEdit(false)}}/>
           }
           {
            !edit && <FiDownload onClick={()=>setEdit(true)}/>
           }
            <FiTrash2 className="text-red-600 hover:cursor-pointer " title="Delete todo"/>
            </div>
        </div>
    )
}

export default TodoItem;