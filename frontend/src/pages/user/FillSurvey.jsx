import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import surveyServices from "../../services/surveyServices";
import { useNavigate } from "react-router-dom";
import responseServices from "../../services/responseServices";

function FillSurvey(){
const[surveys,setSurveys]=useState([])
const navigate=useNavigate();
const[submittedAns,setSubmittedAns]=useState([])
const[loading,setLoading]=useState(true)

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
    },[])

    const handleSurvey=(id)=>{
        navigate(`/survey/${id}`)
    }
useEffect(()=>{
 const  fetchSubmitted=async()=>{
try{
const response=await responseServices.getResponse();
 const ids = response.data.map(r => r.survey);
 setSubmittedAns(ids)
 setLoading(false)
console.log('subitted survey:',response.data)
}catch(err){
console.log("submitted error is",err)
}
    }
    fetchSubmitted();
},[])

const availableSurvey=surveys.filter((survey)=>!submittedAns.includes(survey._id))
    return(
    <>
    <div><Navbar/></div>
    <div className="w-full  md:w-[50%]  mx-auto shadow-md rounded-lg mt-20 p-4">
        <div className="font-bold text-xl mb-4 ">Fill Survey</div>
        {loading&&(<div className="">Loading...</div>)}
        {availableSurvey.length===0?(<div className="text-center text-gray-700 p-6">No surveys available to fill</div>)
        : (availableSurvey.map((survey)=>
     <div  key={survey?._id} className="border rounded  mx-auto flex flex-col w-[70%] mb-4 "> 
    <button onClick={()=>handleSurvey(survey?._id)}>
         <div className="flex flex-col justify-start items-start p-4">
        <div className="font-semibold text-lg ">{survey?.title}</div>
<div className="text-base text-gray-500">{survey?.description}</div>
<div className="text-xs text-gray-500 ">{survey?.questions?.length} Questions</div>
     </div>
    </button>
    

        </div>))

        }
     
       

    </div>
    </>)
}

export default  FillSurvey;