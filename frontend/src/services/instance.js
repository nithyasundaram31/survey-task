import axios from "axios";

const baseURL='http://127.0.0.1:5001/api'

const instance=axios.create({
    baseURL,
    timeout:20000,
    headers:{
    "Content-Type":"application/json"
    },
    withCredentials:true
})


instance.interceptors.request.use((config)=>{
const token=localStorage.getItem('token');
if(token){
config.headers.Authorization=`Bearer ${token}`
}
return config
}
)
export default instance