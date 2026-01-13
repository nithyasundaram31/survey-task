
import { BarChart3, FileText, PlusCircle, Send, Users } from "lucide-react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import surveyServices from "../../services/surveyServices"
import { useEffect, useState } from "react"
import responseServices from "../../services/responseServices"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Dashboard(){
    const[surveys,setSurveys]=useState([]);
  const[responses,setResponses]=useState([]);
  const[chartData,setChartData]=useState([])
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
    },[]);
useEffect(()=>{
  const fetchSruveySummery=async()=>{
    try{
const response=await responseServices.getSurveySummary();
console.log('survey summary response is:',response.data)
setChartData(response.data)
    }catch(err){
console.log('survey summary  error is:',err)
    }

  }
  fetchSruveySummery();
},[])
   



  return(
  <> <div><Navbar/></div>
  
  <div className="mx-auto  p-4 mt-24 w-full  md:w-[60%] h-auto  ">
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
     <div className=" w-full h-64 mt-6">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar fill="#848ead" dataKey="totalResponses" />
      </BarChart>
    </ResponsiveContainer>
  </div>


    </div>

    <div className=" border mt-8 p-6 rounded-xl">
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