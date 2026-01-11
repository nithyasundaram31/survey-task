import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { ToastContainer } from "react-toastify"
import Dashboard from "./pages/user/Dashboard"
import SurveyPage from "./pages/user/SurveyPage"
import FillSurvey from "./pages/user/FillSurvey"
import SurveyResponse from "./pages/user/SurveyResponse"
import ResultPage from "./pages/user/ResultPage"
import ResultBarchartPage from "./pages/user/ResultBarchartPage"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Register/>}/>
<Route path='login' element={<Login/>}/>
<Route path='dashboard' element={<Dashboard/>}/>
<Route path='create-survey' element={<SurveyPage/>}/>
<Route path='survey' element={<FillSurvey/>}/>
<Route path='survey/:id' element={<SurveyResponse/>}/>
<Route path='result' element={<ResultPage/>}/>
<Route path='result/:id' element={<ResultBarchartPage/>}/>
    </Routes>
<ToastContainer/>
    </BrowserRouter>
   
    </>
  )
}

export default App
