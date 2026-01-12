import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import responseServices from "../../services/responseServices";
import { useNavigate } from "react-router-dom";


function ResultPage(){
    const[results,setResults]=useState([]);
    const navigate=useNavigate()
useEffect(()=>{
  const fetchResult=async()=>{
try{
    const response=await responseServices.getSurveySummary();
    console.log('survey result is:',response.data)
    setResults(response?.data)

}catch(err){
console.log(' result error is:',err)
}
   } 

   fetchResult();
},[])

const handleResultBarchart=(id)=>{
navigate(`/result/${id}`)
}

return(
    <>
     <div><Navbar/></div>
     <div className="w-full md:w-[50%] shadow-md mx-auto mt-20 p-6 ">

<div className="text-lg font-bold mb-4">Result Survey</div>
{results.map((result)=>(
<div className=' ' key={result._id}>
    <button onClick={()=>handleResultBarchart(result._id)}  className="w-full rounded flex flex-col justify-start items-start gap-2 border p-4 mb-2">
        <div className="font-bold  ">{result?.title}</div>
          <div className="text-gray-700">{result?.description}</div>
            <div className="text-blue-600 font-semibold">{result?.totalResponses} Response</div>
    </button>

</div>))}
     </div>
    </>
   
)
}

export default ResultPage;