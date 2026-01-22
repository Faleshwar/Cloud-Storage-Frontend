import axios from "axios";
import { BACKEND_URL } from "../Util";

const http = axios.create({baseURL: `${BACKEND_URL}/api`});

http.interceptors.request.use((config)=>{
    const token = localStorage.getItem("authToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default http;