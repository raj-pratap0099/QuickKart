import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext)
  let { adminData, getAdmin } = useContext(adminDataContext)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const AdminLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + "/api/auth/adminlogin",
        { email, password }, { withCredentials: true })
      console.log(result.data)
      toast.success("Admin Login Successfully")
      getAdmin()
      navigate("/")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Admin Login Failed")
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[#080808] text-white
    flex flex-col items-center justify-start'>

      {/* Top bar */}
      <div className='w-full h-[64px] flex items-center px-8 gap-3
      border-b border-white/[0.07]'>
        <div className='w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/10'>
          <img src={logo} alt="" className='w-full h-full object-contain'/>
        </div>
        <span className='text-[16px] font-bold text-white'>
          Quick<span className='text-orange-400'>Cart</span>
        </span>
        <span className='text-[9px] font-semibold text-white/25 tracking-[0.2em] uppercase
        border border-white/10 px-1.5 py-0.5 rounded-full'>Admin</span>
      </div>

      {/* Heading */}
      <div className='flex flex-col items-center gap-1.5 mt-12 mb-8'>
        <h1 className='text-[22px] font-bold text-white tracking-tight'>Admin Login</h1>
        <p className='text-[13px] text-white/35'>Sign in to your QuickCart admin panel</p>
      </div>

      {/* Card */}
      <div className='w-[90%] max-w-[420px] bg-white/[0.04] border border-white/[0.08]
      rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-8'>

        <form onSubmit={AdminLogin} className='flex flex-col gap-4'>

          <input type="text"
            className='w-full h-[44px] bg-white/[0.06] border border-white/[0.1] rounded-xl
            px-4 text-white placeholder:text-white/25 text-[13px] outline-none
            focus:border-orange-400/50 hover:border-white/20 transition-colors duration-200'
            placeholder='Admin Email'
            required onChange={(e) => setEmail(e.target.value)} value={email}/>

          <div className='relative'>
            <input type={show ? "text" : "password"}
              className='w-full h-[44px] bg-white/[0.06] border border-white/[0.1] rounded-xl
              px-4 pr-11 text-white placeholder:text-white/25 text-[13px] outline-none
              focus:border-orange-400/50 hover:border-white/20 transition-colors duration-200'
              placeholder='Password'
              required onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button type='button'
              className='absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60
              transition-colors duration-200'
              onClick={() => setShow(prev => !prev)}>
              {show ? <IoEye className='w-4 h-4'/> : <IoEyeOutline className='w-4 h-4'/>}
            </button>
          </div>

          <button type='submit'
            className='w-full h-[44px] bg-orange-500 hover:bg-orange-400 active:scale-[0.97]
            text-white font-semibold text-[14px] rounded-xl mt-2
            shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35
            transition-all duration-300 flex items-center justify-center'>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>
      </div>

    </div>
  )
}

export default Login
