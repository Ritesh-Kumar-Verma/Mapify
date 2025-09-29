import axios from "axios";
import { toast } from "react-toastify";


const url = import.meta.env.VITE_MAPIFY_BACKEND_URL_V2;

const unauthorised = (error) => {
    
  if (error.response?.status === 401) {
    toast.error("Session expired. Please log in again.");
    // logout()
    throw new Error("401 Unauthorized: JWT expired or invalid");
  }
  throw error.response ? error.response.data : error;
};

export const authHeader = ()=>{
    const jwttoken = localStorage.getItem("jwttoken")
    if(!jwttoken){
        toast.error("Login Again")
        // logout()
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000);
        throw new Error("No JWT Token Found")
    }
    return { Authorization : `Bearer ${jwttoken}`}
}

export const search = async (keyword)=>{

    try{
        const res = await axios.get(`${url}/search`,{
            headers: authHeader(),
            params:{
                keyword : keyword 
            }
        })
        // console.log(res)
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}

export const sendRequest = async (username)=>{
    
    
    try{
        const res = await axios.post(`${url}/sendfriendrequest`,{},{
            headers : authHeader(),
            params :{
                username : username
            }
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}


export const getPendingRequest = async ()=>{
    try{
        const res = await axios.get(`${url}/getpendingrequests`,{
            headers : authHeader()
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}



export const getMyRequest = async ()=>{
    try{
        const res = await axios.get(`${url}/getmyrequests`,{
            headers : authHeader()
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}

export const acceptRequest=async (username)=>{
    try{
        const res = await axios.put(`${url}/acceptfriendrequest`,{},{
            headers : authHeader(),
            params : {
                username : username
            }
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}

export const rejectRequest = async (username) =>{
    try{
        const res = await axios.delete(`${url}/rejectrequest`,{
            headers : authHeader(),
            params : {
                username : username
            }
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)

    }
}


export const cancelRequest = async (username)=>{
    try{
        const res = await axios.delete(`${url}/cancelrequest`,{
            headers : authHeader(),
            params : {
                username : username
            }
        })
        return res.data
    }
    catch(error){
        unauthorised(error)
    }
}



export const getFriendsList = async ()=>{
    try{
        const res = await axios.get(`${url}/getfriendslist`,{
            headers : authHeader()
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}

export const getLocation = async (username)=>{
    try{
        const res = await axios.get(`${url}/getlocation`,{
            headers : authHeader(),
            params : {
                username : username
            }
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}


export const addSelfLocation = async (myLocation)=>{
    const latitude = myLocation[0]
    const longitude = myLocation[1]
    try{
        const res = await axios.put(`${url}/addselflocation`,{
            latitude : latitude,
            longitude : longitude
        },{
            headers : authHeader()
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}


export const deleteMember= async (username)=>{
    try{
        const res = await axios.delete(`${url}/deletefriendship`,{
            headers : authHeader(),
            params : {
                username : username
            }
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}



export const getViewerList = async ()=>{

    try{
        const res = await axios.get(`${url}/getmyviewerslist`,{
            headers : authHeader()
        })
        return res.data
    }
    catch(error){
        return unauthorised(error)
    }
}



