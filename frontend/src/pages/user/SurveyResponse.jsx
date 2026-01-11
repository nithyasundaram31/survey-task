import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import surveyServices from "../../services/surveyServices"
import { useNavigate, useParams } from "react-router-dom"
import responseServices from "../../services/responseServices";
import { toast } from "react-toastify";

function SurveyResponse(){
    const {id}=useParams();
    const [answers,setAnswers]=useState([])
    const[surveyId,setSurveyId]=useState(null);
    const navigate=useNavigate()
useEffect(()=>{
const handleSurveyId=async()=>{
    try{
        const response=await surveyServices.getSurveyById(id)
        console.log('surveyId response is',response.data);
        setSurveyId(response.data)

    }catch(err){
       console.log('surveyId error:',err)
    }

}
handleSurveyId()
},[])

const handleChange=(questionId,selectedAnswer)=>{
 setAnswers((prev)=>{
    const found=prev.find((q)=>q.questionId===questionId)
if(found){
    return prev.map((q)=>q.questionId===questionId?{...q,answers:selectedAnswer}:q)
}else{
 return [...prev,{questionId,answer:selectedAnswer}]
}
}
)


}
const handleResponse=async(e)=>{
e.preventDefault();
try{
const response=await responseServices.createResponse({surveyId:id,answers});
console.log('fill response is:',response.data)
toast.success(response.data?.message)
navigate(`/survey`)
// setAnswers(response.data)

}catch(err){
console.log('fill response error is:',err);
toast.error(response.data?.error)
}

}
// console.log('fill answers:',answers)
    return(
        <>
        <div><Navbar/>  </div>
        <div  className="p-2">
        <form  onSubmit={handleResponse} className="w-full md:w-[50%] mx-auto shadow-md mt-20 p-6">
            {surveyId &&(
             <div key={surveyId?._id}>
<div className="text-lg font-bold mb-2">{surveyId?.title}</div>
<div >{surveyId?.questions.map((q)=>
<div className="flex flex-col border rounded  mb-2 p-4">
    <div className="mb-2 text-base font-semibold">{q?.questionText}</div>
   
   {q?.options.map((opt,i)=>
<label className="flex gap-1" key={i} >
<input  type='radio' onChange={()=>handleChange(q._id,opt)} name={q?._id} value={opt}/>{opt}
</label>
)}
    </div>)}</div>
             </div>
            )}
<button  className='text-white bg-blue-500 p-2 rounded transition transform active:scale-90' type='submit'>Submit Survey</button>
</form>
        </div>
        </>
    )
}

export default SurveyResponse