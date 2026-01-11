const mongoose = require("mongoose");
const app=require("./app")
const { MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI)
.then(()=>{  
    console.log('connected to the mongodb')}
   
).catch((err)=>{
    console.log(`error connecting to the mongodb:${err.message}`)
})

const PORT=process.env.PORT|| 50001
app.listen(PORT,()=>{
    console.log(`Server is running @ http://127.0.0.1:${PORT}`)
})