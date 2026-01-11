const express=require("express");
const cors=require("cors")
const userRoute = require("./routers/userRoute");
const responseRoute = require("./routers/responseRoute");
const surveyRoute = require("./routers/surveyRoute");
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use('/api/auth',userRoute);
app.use('/api/response',responseRoute);
app.use('/api/survey',surveyRoute)

module.exports=app