const jwt=require('jsonwebtoken')
const authenticate=()=>{
return(req,res,next)=>{
const strToken=req.headers.authorization?.split(' ')[1]
const token=strToken.replace(/"/g,'')

if(!token){
    return res.status(401).json({message:'Unauthorized access'})
}

jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{

    if(err){
        return res.status(401).json({message:'token invalid'})
    }
req.user=decoded;
next();
})

// if(role &&req.user.role !==role){
//     return res.status(403).json({message:"Forbidden:Insufficient Permission"})
// }

}
}

module.exports=authenticate;