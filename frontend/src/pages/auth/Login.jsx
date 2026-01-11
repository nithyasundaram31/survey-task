import { useState } from "react";
import{Link, useNavigate} from "react-router-dom"
import authServices from "../../services/authServices";
function Login(){

   
const[email,setEmail]=useState('')
const[password,setpassword]=useState('')
const navigate=useNavigate()

const handleLogin=async(e)=>{
e.preventDefault()
try{
  const response=await authServices.login({email,password})
  localStorage.setItem('token',JSON.stringify(response.data?.token))
  localStorage.setItem('user',JSON.stringify(response?.data?.user))
console.log("login response is:",response.data)
const userDetails=JSON.parse(localStorage.getItem('user'));
console.log('logged in user :',userDetails);
if(userDetails){
navigate('/dashboard')
}
}catch(err){
  console.log("login error response is:",err)
}

}
// const navigate=useNavigate()
    return(  <>
        <div className=" p-4 mt-8 rounded ">
       <form onSubmit={handleLogin} className="w-full md:w-[30%] mx-auto  flex flex-col gap-2 bg-white shadow-md p-4">
     
      
     <div className="flex flex-col gap-2">
        <div className="text-gray-700">Email</div>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded" />
     </div>
       
       <div className="flex flex-col gap-2 mb-2">
        <div className="text-gray-700">Password</div>
          <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)} className="border p-2 rounded " />
     </div>
      
      <button type='submit' className=" bg-blue-500 border p-2 rounded-md text-white mb-2 transform transition active:scale-90 hover:bg-blue-600">Login</button>
      <div className="text-center text-gray-600">Don't have an account? <Link  className='text-blue-500 hover:underline ' to='/'>Sign Up</Link></div>
       </form>
       </div>
        </>)
}

export default Login;