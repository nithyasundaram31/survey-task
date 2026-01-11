const  mongoose = require("mongoose")
const questionSchema = require("./question")

const surveySchema=new mongoose.Schema({

    title:{
    type: String,
    required:true
    },
    description:{
        type:String,
        required:true
    },
    questions:[questionSchema],

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:'User',
required:true
},

status:{
    type:String,
    enum:['active','closed'],
    default:'active'
}

} ,{timestamps:true})

module.exports=mongoose.model('Survey',surveySchema,'surveys')