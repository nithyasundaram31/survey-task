const mongoose=require('mongoose')
const questionSchema=new mongoose.Schema({
 questionText:{
    type:String,
    required:true
 },

 questionType:{
    type:String,
    enum:['mcq','text'],
    required:true
 },

 options:{
    type:[String],
    default:[]
 }


})

module.exports=questionSchema;