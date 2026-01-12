
import { BarChart2, BarChart3, FileText, PlusCircle, Send, Users } from "lucide-react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import surveyServices from "../../services/surveyServices"
import { useEffect, useState } from "react"
import responseServices from "../../services/responseServices"

function Dashboard(){
    const[surveys,setSurveys]=useState([]);
  const[responses,setResponses]=useState([])
const navigate=useNavigate()
    const handleSurvey=()=>{
navigate('/create-survey')

    }

    const handleFillSurvey=()=>{
        navigate('/survey')
    }
    const handleResult=()=>{
        navigate('/result')
    }

     useEffect(()=>{
 const fetchSurvey=async()=>{
    try{
     const response=await surveyServices.getAllSurvey();
     setSurveys(response.data)
     console.log('fetch all survey:',response.data)
    }catch(err){
        console.log("fetch survey error is:",err)
    }

        }
        fetchSurvey()
    },[]);

     useEffect(()=>{
 const fetchResponse=async()=>{
    try{
     const response=await responseServices.getAllResponse();
     setResponses(response.data)
     console.log('fetch all responses:',response.data)
    }catch(err){
        console.log("fetch survey error is:",err)
    }

        }
        fetchResponse()
    },[])
  return(
  <> <div><Navbar/></div>
  
  <div className="mx-auto  p-4 mt-16 w-full  md:w-[60%] h-auto  ">
    <div className="grid grid-col-3 gap-4 ">
        <div className="bg-blue-100 border p-6 rounded-lg ">
            <div className="text-blue-600"><FileText size={36}/></div>
            <div className="font-bold text-xl">{surveys.length}</div>
 <div>Surveys Created</div>
        </div>
         <div className=" bg-green-100 border p-6  rounded-lg">
            <div className="text-green-600"><Users size={36}/></div>
            <div className="font-bold text-xl">{responses?.length}</div>
 <div>Survey Response</div>
        </div>
         <div className=" bg-violet-100 border p-6 rounded-lg">
            <div className="text-violet-600"><BarChart2 size={36}/></div>
            <div>4</div>
 <div>Survey Response</div>
        </div>
    </div>

    <div className=" border mt-4 p-6 rounded-xl">
<div className="text-xl font-bold mb-4">Quick Actions</div>

<div className="flex flex-col  gap-4 px-6">
<button onClick={handleSurvey} className=" flex justify-center items-center gap-2 bg-blue-600  rounded-lg p-3 text-white ">
    <span><PlusCircle /></span>
    <span>Create New Survey</span>
    </button>
<button onClick={handleFillSurvey} className=" flex bg-green-600 justify-center  gap-2 items-center  rounded-lg p-3 text-white">
     <span><Send /></span>
    <span >Fill survey</span></button>
<button onClick={handleResult}className=" flex justify-center items-center gap-2 bg-violet-600  rounded-lg p-3 text-white">
       <span><BarChart3/></span>
     <span>View results</span> </button>
</div>
    </div>
  </div>
  </>
)
 
  


}

export default Dashboard