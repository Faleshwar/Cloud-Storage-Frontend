import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {

    const auth = useAuthContext();
    const navigate = useNavigate();

    const onSuccess = async (credentialResponse)=>{
       try{
         await auth.googleLogin(credentialResponse.credential);
         navigate("/");
       }catch(err){
        console.error("Error while google login", err);
       }
    }

    const onFailure = ()=>{
        console.error("Google Login Failed");
    }

  return (
   <GoogleLogin onSuccess={onSuccess} onError={onFailure} text='continue_with' />
  )
}

export default GoogleLoginButton
