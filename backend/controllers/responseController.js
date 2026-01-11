const Response = require("../models/response");
const Survey = require("../models/Survey");

exports.createResponse=async(req,res)=>{
try{
    const {surveyId,answers}=req.body

    if(!surveyId|| !answers ||answers.length===0){
      return  res.status(400).json({message:"All fields are required"})  
    }
    const response=new Response({
    survey:surveyId,
    user:req.user.userId, //logged-in user
    answers
    })

    await response.save()
    return res.status(201).json({message:"response submitted",response})
}catch(err){
return res.status(500).json({error:err.message})
}
},

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find({
      user: req.user.userId
    }).select("survey");

    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSurveySummary = async (req, res) => {
  try {
  
    const surveys = await Survey.find();
    const result = [];

    for (let survey of surveys) {
      const totalResponses = await Response.countDocuments({
        survey: survey._id
      });

      result.push({
        _id: survey._id,
        title: survey.title,
        description: survey.description,
        totalResponses
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSurveyResult=async(req,res)=>{
    try{
const responses=await Response.find({survey:req.params.surveyId})

const result={}
responses.forEach((response)=>{
    response.answers.forEach((ans)=>{
const qId=ans.questionId.toString();
const answer=ans.answer

if(!result[qId]){
    result[qId]={}
}

if(!result[qId][answer]){
    result[qId][answer]=0
}

result[qId][answer]++
    })
})

return res.status(200).json(result)
}catch(err){
return res.status(500).json({message:err.message})
}
}
