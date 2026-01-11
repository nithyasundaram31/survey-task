import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import responseServices from "../../services/responseServices"
import { useEffect, useState } from "react"

function ResultBarchartPage(){
    const{id}=useParams()
    const[resultBarchart,setResultBarchart]=useState(null)

    useEffect(()=>{
const fetchrResponse=async()=>{
try{
const response=await responseServices.getSurveyResult(id);
console.log('the barchart response',response.data);
setResultBarchart(response.data)
}catch(err){
console.log('the result barchart error is:',err)
}
}
fetchrResponse()
    })
    return(
        <>
        <div><Navbar/></div>
        <div className="mx-auto  w-full md:w-[50%] mt-20 p-4 shadow-md">
{resultBarchart&&(
    <div>{resultBarchart?.title}</div>
)}
        </div>
        </>
    )
}

export default ResultBarchartPage