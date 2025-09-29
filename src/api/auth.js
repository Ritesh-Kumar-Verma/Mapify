import axios from "axios";
import {authHeader} from "./users"
const url = import.meta.env.VITE_MAPIFY_BACKEND_URL_V2;

export const register = async (userLoginInfo) => {
  try {
    const res = await axios.post(`${url}/register`, userLoginInfo);

    localStorage.setItem("jwttoken", res.data);
    localStorage.setItem("loginStatus",true)
    
    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const login = async (userLoginInfo) => {
  try {
    const res = await axios.post(`${url}/login`, userLoginInfo);
    localStorage.setItem("currentUsername" , userLoginInfo.username)
    localStorage.setItem("jwttoken", res.data);
    localStorage.setItem("loginStatus",true)

    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logout = ()=>{
    localStorage.removeItem("jwttoken")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("loginStatus")
    localStorage.removeItem("currentUsername")
    window.location.href = ""

    
}


export const changePassword =async (password)=>{

  try{
    const res =await axios.post(`${url}/changepassword`,password,{
      headers : authHeader()
    })
    return res.data
  }
  catch(error){
    throw error.response ? error.response.data : error
  }
}