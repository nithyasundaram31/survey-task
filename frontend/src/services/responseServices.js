import instance from "./instance"

const responseServices={
createResponse:async(userData)=>{
    return await instance.post('/response',userData)
},
getResponse:async()=>{
    return await instance.get('/response/submitted')
},
getSurveyResult:async(id)=>{
return await instance.get(`/response/${id}`)
},
getSurveySummary:async()=>{
    const res= await instance.get('/response/summary')
  return res
}



}

export default responseServices;