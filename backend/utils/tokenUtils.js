const jwt=require("jsonwebtoken")
require("dotenv").config()
const createToken=(user)=>{

    try{
const token=jwt.sign(
   {userId:user._id},
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE,}
)
console.log('Generated token:', token)
return token;
    }catch(err){
console.log("Error creating token:",err)
throw new Error('Error creation failed')
    }

}

  module.exports={createToken};