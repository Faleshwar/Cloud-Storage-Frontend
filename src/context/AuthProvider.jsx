import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BACKEND_URL } from "../Util";
import { authApi } from "../service/authApi";
import { useNavigate } from "react-router-dom";



export const AuthProvider = ({children})=>{
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const login = async(credentials) =>{
            const res = await authApi.login(credentials)
            if(res.status === 403)return;
            setAuthToken(res.data.jwt);
            localStorage.setItem("authToken", res.data.jwt);
            setLoading(false);
    }

    const googleLogin = async (googleIdToken) =>{
        
            const payload = {idToken: googleIdToken};
            const res = await authApi.googleLogin(payload);
            //console.log("Google Login response: ", res.data);
            setAuthToken(res.data.jwt);
            localStorage.setItem("authToken", res.data.jwt);
            setLoading(false);   
    }

    const register = async(credentials)=>{
            const payload = {
                email: credentials.email,
                name: credentials.name,
                password: credentials.password
            }

            const res = await authApi.register(payload);
            if(res.status !== 201)return;
            setAuthToken(res.data.jwt);
            //setCurrentUser("fake-user");
            localStorage.setItem("authToken", res.data.jwt);
            setLoading(false)
    }

    useEffect(()=>{
        const storedToken = localStorage.getItem("authToken");
        if(storedToken){
            setAuthToken(storedToken);
            setLoading(false);
        }else{
            navigate("/login")
        }
    }, []);

    const logout = ()=>{
        setAuthToken(null);
        setCurrentUser(null);
        localStorage.removeItem("authToken");
    }

    const value = {authToken, currentUser, loading, login, googleLogin, register, logout};


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}