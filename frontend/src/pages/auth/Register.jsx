import { useState } from "react";
import authServices from "../../services/authServices";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register(){
const[name,setName]=useState('');
const[email,setEmail]=useState('')
const[password,setpassword]=useState('')
const navigate=useNavigate()


    const handleSubmit=async(e)=>{
e.preventDefault();
try{
    const response=await authServices.register({name,email,password})
console.log('register response is:',response.data)
setName('');
setEmail('');
setpassword('');
toast.success(response?.data?.message)
// localStorage.setItem('user',JSON.stringify(response?.data?.user))


navigate('/login')
}catch(err){
console.log("register error response is:",err.response?.data)
toast.error(err.response?.data?.message)
}


    }

    return(
        <>
        <div className=" p-4 mt-8 rounded ">
       <form onSubmit={handleSubmit} className="w-full md:w-[30%] mx-auto  flex flex-col gap-2 bg-white shadow-md p-4">
       <div className="flex flex-col gap-2">
        <div className="text-gray-700">Name</div>
          <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} className=" p-2 w-full border rounded" />
       </div>
     <div className="flex flex-col gap-2">
        <div className="text-gray-700">Email</div>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded" />
     </div>
       
       <div className="flex flex-col gap-2 mb-2">
        <div className="text-gray-700">Password</div>
          <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)} className="border p-2 rounded " />
     </div>
      
      <button type='submit' className=" bg-blue-500 border p-2 rounded-md text-white mb-2 transform transition active:scale-90 hover:bg-blue-600">Sign Up</button>
      <div className="text-center text-gray-500">Already have an account?<Link className="text-blue-500 hover:underline" to='/login'>Login</Link> </div>
       </form>
       </div>
        </>
    )
}

export default Register