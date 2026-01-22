import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";
import {useUIContext} from "../context/UIContext"


const Login = () => {

    const auth = useAuthContext();
    const {showToast} = useUIContext();
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);

    const handleLogin = async(e)=>{
       try{
         e.preventDefault();
        const credentials = {email, password};
        await auth.login(credentials);
         showToast("success","Login successful")
        navigate("/")
       }catch(err){
        showToast("error","Login failed please provide valid email and password")
        console.log("Login error", err);
       }finally{
        setEmail("");
        setPassword("");
       }
    }


    
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <div className='w-2/7 h-120 bg-amber-200 px-5 py-2 rounded-md'>
        <h1 className='text-2xl text-center font-medium p-2 mt-2'>Login</h1>
        
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' id="email" className='w-full border-2 p-2 rounded-md mt-2 mb-2' />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type={togglePassword?"text":"password"} id="password" className='w-full border-2 p-2 rounded-md mt-2 mb-2'/>
             <button type="button" onClick={()=>setTogglePassword(!togglePassword)} className='text-blue-600 mb-2'>{togglePassword ? "Hide" : "Show"} Password</button>
            <div className='mt-2 mb-2'><input type="checkbox" id="rememberMe"/> <span>Remember me</span></div>
            <input type="submit" value="Login" className="w-full bg-green-800 cursor-pointer p-2 rounded-md text-white font-bold mt-2 mb-2 hover:bg-blue-800"/>
            <div className='mt-2 mb-2'><GoogleLoginButton/></div>
            <p className='mt-2 mb-2'>Don't have an account <Link className='text-blue-600' to="/register">Register</Link> </p>
        </form>
        </div>
        <Toaster position="top-center" />
    </div>
  )
}

export default Login