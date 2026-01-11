const express=require("express")
const { createResponse, getSurveyResult, getResponses, getSurveySummary } = require("../controllers/responseController");
const authenticate = require("../middleware/auth");

const responseRoute=express.Router()


responseRoute.post('/',authenticate(),createResponse);
responseRoute.get('/submitted',authenticate(),getResponses)
responseRoute.get('/summary',getSurveySummary)
responseRoute.get('/:id',getSurveyResult)


module.exports=responseRoute;