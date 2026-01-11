
const Survey = require("../models/Survey")


exports.createSurvey=async(req,res)=>{
   console.log('user is:',req.user.userId)
try{
const{title,description,questions}=req.body
if(!title||!description||!questions|| questions.length===0){
return res.status(400).json({message:'All fields are required'})
}

const survey=new Survey({
   title,
   description,
   questions,
   createdBy:req.user.userId   //from auth middleware
})

await survey.save()
return res.status(201).json(survey,{message:"survey created successfully"})

}catch(err){
return res.status(500).json({message:"server error",error:err.message})
}
},

exports.getAllSurvey=async(req,res)=>{
try{
const surveys= await Survey.find();
return res.status(200).json(surveys)

}catch(err){
return res.status(500).json({message:"Server error",error:err.message})
}
},

exports.getSurveyById=async(req,res)=>{
try{
const survey=await Survey.findById(req.params.id)
if(!survey){
   return res.status(404).json({message:"survey not found"})
}
return res.status(200).json(survey)
}catch(err){
return res.status(500).json({message:"servor error",error:err.message}) 

}

},

exports.deleteSurvey=async(req,res)=>{
try{

   const delSurvey= await Survey.findByIdAndDelete(req.params.id)
   if(!delSurvey){
      return  res.status(404).json({message:"survey not found"})
   }
return res.status(200).json({message:"survey deleted successfully"})

}catch(err){
return res.status(500).json({message:"failed to delete survey",error:err.message})
}
}

