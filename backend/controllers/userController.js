const User = require("../models/User");
const bcrypt=require("bcryptjs");
const { createToken } = require("../utils/tokenUtils");

exports.register=async(req,res)=>{
try{
const{name,email,password}=req.body

if(!name|| !email|| !password){
    return res.status(400).json({message:"All fields are required"})
}

const existUser=await User.findOne({email})
if(existUser){
return res.status(400).json({message:"user already exists"})
}
const hashedPassword=await bcrypt.hash(req.body.password,10)
const user= new User({
    name,
    email,
    password:hashedPassword
})

await user.save()

return res.status(201).json({user: {name,email},message:"Registration successfull"})
}catch(err){
return res.status(500).json({message:"Something went wrong"})

}
},

exports.login=async(req,res)=>{
try{
const{email,password}=req.body

if(!email|| !password){
    return res.status(400).json({message:"All fields are required"})
}

const user= await User.findOne({email}).select('+password')

if(!user){
    return res.status(400).json({success:false, message:"Invalid User. Please try again "})
}

const match= await bcrypt.compare(password,user.password)
if(!match){
     return res.status(400).json({success:false, message:"Invalid User. Please try again "})
}

const token=  createToken(user)

return res.status(200).json({

    token,
  user:{ 
    name:user.name,
    email:user.email,
    // role:user.role,
    id:user._id},

message:"Login successfull" 
},)
}catch(err){
    return res.status(500).json({message:err.message})
}
},

exports.getAllUsers=async(req,res)=>{
    try{
const users=await User.find().select('-password')
return res.status(200).json(users)
    }catch(err){
  return res.status(500).json({message:"something went wrong",err:err.message})
    }
}