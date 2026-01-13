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

exports.getAllResponse=async(req,res)=>{
try{
const response= await Response.find();
return res.status(200).json(response)

}catch(err){
return res.status(500).json({message:"Server error",error:err.message})
}
},

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

exports.getSurveyResult = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    // Map questions
    const questionMap = {};
    survey.questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });

    const responses = await Response.find({ survey: req.params.id });

    const result = {};

    responses.forEach((response) => {
      response.answers.forEach((ans) => {
        const qId = ans.questionId.toString();
        const answer = ans.answer;
        const question = questionMap[qId];

        if (!question) return;

        // INIT
        if (!result[qId]) {
          result[qId] = {
            questionText: question.questionText,
            questionType: question.questionType, // 🔥 IMPORTANT
            options: question.options || [],
            totalResponses: 0,
            answers:
              question.questionType === "mcq" ? {} : [] // 🔥 KEY FIX
          };
        }

        // MCQ
        if (question.questionType === "mcq") {
          if (!result[qId].answers[answer]) {
            result[qId].answers[answer] = 0;
          }
          result[qId].answers[answer]++;
        }

        // TEXT
        if (question.questionType === "text") {
          result[qId].answers.push(answer);
        }

        result[qId].totalResponses++;
      });
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
