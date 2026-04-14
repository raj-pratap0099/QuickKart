import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext.jsx';
import { useContext } from 'react';
import axios from "axios"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

const Login = () => {
  let [show, setShow] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let {getCurrentUser} = useContext(userDataContext)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let result = await axios.post(serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      getCurrentUser()
      navigate("/")
      toast.success("User Login Successful")
      console.log(result.data)
      setLoading(false)
    } catch(error) {
      console.log(error)
      toast.error("User Login Failed")
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      )
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[#0a0a0a] text-white flex flex-col items-center justify-start'>

      {/* Logo bar */}
      <div className='w-full h-[70px] flex items-center justify-start px-8 gap-3 cursor-pointer border-b border-white/10'
        onClick={() => navigate("/")}>
        <img className='w-[32px]' src={Logo} alt="" />
        <h1 className='text-[20px] font-bold'>Quick<span className='text-orange-400'>Cart</span></h1>
      </div>

      {/* Heading */}
      <div className='w-full flex items-center justify-center flex-col gap-2 mt-10 mb-6'>
        <span className='text-[26px] font-bold'>Welcome back</span>
        <span className='text-[14px] text-white/50'>Login to your QuickCart account</span>
      </div>

      {/* Card */}
      <div className='max-w-[480px] w-[90%] bg-white/5 border border-white/10 rounded-2xl
      shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex items-center justify-center p-8'>

        <form onSubmit={handleLogin} className='w-full flex flex-col items-center gap-4'>

          {/* Google */}
          <button type='button'
            className='w-full h-[46px] bg-white/10 border border-white/20 rounded-full flex items-center
            justify-center gap-3 text-[14px] text-white/80 hover:bg-white/15 transition-colors duration-200 cursor-pointer'
            onClick={googleLogin}>
            <img src={google} alt="" className='w-[18px]'/> Continue with Google
          </button>

          <div className='w-full flex items-center gap-3 text-white/30 text-[12px]'>
            <div className='flex-1 h-[1px] bg-white/10'/>
            OR
            <div className='flex-1 h-[1px] bg-white/10'/>
          </div>

          {/* Inputs */}
          <input type="text"
            className='w-full h-[46px] bg-white/10 border border-white/20 rounded-full px-5
            text-white placeholder:text-white/40 text-[14px] outline-none focus:border-orange-400 transition-colors duration-200'
            placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

          <div className='w-full relative'>
            <input type={show ? "text" : "password"}
              className='w-full h-[46px] bg-white/10 border border-white/20 rounded-full px-5 pr-12
              text-white placeholder:text-white/40 text-[14px] outline-none focus:border-orange-400 transition-colors duration-200'
              placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            {!show
              ? <IoEyeOutline className='w-[18px] h-[18px] cursor-pointer absolute right-4 top-[50%] -translate-y-1/2 text-white/40' onClick={() => setShow(prev => !prev)}/>
              : <IoEye className='w-[18px] h-[18px] cursor-pointer absolute right-4 top-[50%] -translate-y-1/2 text-white/40' onClick={() => setShow(prev => !prev)}/>
            }
          </div>

          <button className='w-full h-[46px] bg-orange-500 hover:bg-orange-400 active:scale-95
          rounded-full text-white font-semibold text-[15px] mt-2 transition-all duration-200
          shadow-lg shadow-orange-500/30 flex items-center justify-center'>
            {loading ? <Loading/> : "Login"}
          </button>

          <p className='text-[13px] text-white/50'>
            Don't have an account?{' '}
            <span className='text-orange-400 font-semibold cursor-pointer hover:text-orange-300'
              onClick={() => navigate("/signup")}>Create Account</span>
          </p>

        </form>
      </div>

    </div>
  )
}

export default Login
