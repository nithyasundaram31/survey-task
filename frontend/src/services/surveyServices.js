import instance from "./instance"

const surveyServices={

    createSurvey:async(userData)=>{
return await instance.post('/survey',userData)
    },
    getAllSurvey:async()=>{
        return await instance.get('/survey')
    },
    getSurveyById:async(id)=>{
return await instance.get(`/survey/${id}`)
    }
}

export default surveyServices