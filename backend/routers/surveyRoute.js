const express=require('express')
const { createSurvey, getAllSurvey, getSurveyById, deleteSurvey } = require("../controllers/surveyController");
const authenticate = require('../middleware/auth');

const surveyRoute=express.Router();

surveyRoute.post('/',authenticate(),createSurvey);
surveyRoute.get('/',getAllSurvey);
surveyRoute.get('/:id',getSurveyById);
surveyRoute.delete('/:id',deleteSurvey)
module.exports=surveyRoute;
