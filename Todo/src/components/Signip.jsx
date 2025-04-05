import React,{useState} from "react";
import {Client,ID,Account,Databases} from 'appwrite'

function Signup(){
    const [loading,setLoading] = useState(false)
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    async function handleSubmit(){
        setName(firstName+lastName)
        try {
            const client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1')
                .setProject('67efd413003a478100a0')

            const account = new Account(client) 

            const response = await account.create(ID.unique(),email,password)
            console.log(response)

            setEmail("")
            setFirstName("")
            setLastName("")
            setPassword("")

            
        } catch (error) {
            
        }
    }
    
    return(
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
  {/* Card Container */}
  <div className="w-full max-w-md bg-[#1E293B] rounded-xl p-8 shadow-lg border border-[#334155]">
    
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-[#F8FAFC]">Get Started</h1>
      <p className="text-[#94A3B8] mt-2">Create your account</p>
    </div>

    {/* Signup Form */}
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#F8FAFC] mb-2">First Name</label>
          <input 
            type="text" 
            className="w-full bg-[#334155] text-[#F8FAFC] p-3 rounded-lg border border-[#475569] focus:border-[#7C3AED]"
            onChange={(e)=>setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[#F8FAFC] mb-2">Last Name</label>
          <input 
            type="text" 
            className="w-full bg-[#334155] text-[#F8FAFC] p-3 rounded-lg border border-[#475569] focus:border-[#7C3AED]"
            onChange={(e)=>setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-[#F8FAFC] mb-2">Email</label>
        <input 
          type="email" 
          className="w-full bg-[#334155] text-[#F8FAFC] p-3 rounded-lg border border-[#475569] focus:border-[#7C3AED]"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-[#F8FAFC] mb-2">Password</label>
        <input
          type="password"
          className="w-full bg-[#334155] text-[#F8FAFC] p-3 rounded-lg border border-[#475569] focus:border-[#7C3AED]"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <p className="text-xs text-[#94A3B8] mt-1">Minimum 8 characters</p>
      </div>

      <button 
       
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 px-4 rounded-lg mt-4 transition-colors"
        onClick={handleSubmit}
      >
        Create Account
      </button>
    </div>

    {/* Footer */}
    <div className="mt-6 text-center text-[#94A3B8]">
      <p>
        Already have an account? 
        <a href="/login" className="text-[#7C3AED] hover:underline ml-1">Login</a>
      </p>
    </div>
  </div>
</div>
    )
}

export default Signup;