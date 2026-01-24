import React, { use, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { useUIContext } from '../context/UIContext';

const Register = () => {

  const [togglePassword, setTogglePassword] = useState(false);
  const auth = useAuthContext();
  const [credentials, setCredentials] = useState({ email: "", name: "", password: "" })
  const {showToast} = useUIContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.register(credentials)
      setCredentials({ email: "", name: "", password: "" });
      setTimeout(()=>{
        navigate("/");
      }, 1500)
      
    } catch (err) {
      showToast("error", "Registration failed")
      console.error("Register failed ", err);
    }
  }
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className='w-2/7 h-140 bg-amber-200 px-5 py-2 rounded-md'>
        <h1 className='text-2xl text-center font-medium p-2 mt-2 mb-2'>Register</h1>
        <form onSubmit={handleRegister}>
          <label htmlFor="email">Email</label>
          <input required value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} type='email' id="email" className='w-full border-2 p-2 rounded-md mt-2 mb-2' />
          <label htmlFor="name">Name</label>
          <input required value={credentials.name} onChange={(e) => setCredentials({ ...credentials, name: e.target.value })} type='text' id="name" className='w-full border-2 p-2 rounded-md mt-2 mb-2' />
          <label htmlFor="password">Password</label>
          <input required value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type={togglePassword ? "text" : "password"} id="password" className='w-full border-2 p-2 rounded-md mt-2 mb-2' />
          <button type="button" onClick={() => setTogglePassword(!togglePassword)} className='text-blue-600 mb-2'>{togglePassword ? "Hide" : "Show"} Password</button>
          <div className='mt-2 mb-2'><input type="checkbox" id="rememberMe" /> <span>Remember me</span></div>
          <input type="submit" value="Register" className="w-full bg-green-800 cursor-pointer p-2 rounded-md text-white font-bold mt-2 mb-2 hover:bg-blue-800" />
          <div className='mt-2 mb-2'><GoogleLoginButton /></div>
          <p className='mt-2 mb-2'>Alread registered <Link className='text-blue-600' to="/login">login</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Register
