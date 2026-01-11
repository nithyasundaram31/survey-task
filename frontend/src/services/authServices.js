import instance from "./instance"

const authServices={
register:async(userData)=>{

    return await instance.post('/auth/register',userData)
},

login:async(userData)=>{
    return await instance.post('/auth/login',userData)
}

}

export default authServices