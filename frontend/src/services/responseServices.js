import instance from "./instance"

const responseServices={
createResponse:async(userData)=>{
    return await instance.post('/response',userData)
},
getAllResponse:async()=>{
    return await instance.get('/response')
},
getResponse:async()=>{
    return await instance.get('/response/submitted')
},
getSurveySummary:async()=>{
    return await instance.get('/response/summary') 
},

getSurveyResult:async(id)=>{
const res=await instance.get(`/response/${id}`);
console.log('survey api result is:',res)
return res
},



}

export default responseServices;