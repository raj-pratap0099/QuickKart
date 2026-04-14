import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Nav = () => {
  let navigate = useNavigate()
  let { serverUrl } = useContext(authDataContext)
  let { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logOut", { withCredentials: true })
      console.log(result.data)
      toast.success("LogOut Successfully")
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error("LogOut Failed")
    }
  }

  return (
    <div className='w-full h-[64px] fixed top-0 z-50 flex items-center justify-between
    px-6 lg:px-10 bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.07]
    shadow-[0_1px_0_rgba(255,255,255,0.04)]'>

      {/* Logo */}
      <div className='flex items-center gap-3 cursor-pointer group select-none'
        onClick={() => navigate("/")}>
        <div className='w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10
        group-hover:ring-orange-400/50 transition-all duration-200 flex-shrink-0'>
          <img src={logo} alt="" className='w-full h-full object-contain'/>
        </div>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-[17px] font-bold text-white tracking-tight'>
            Quick<span className='text-orange-400'>Cart</span>
          </span>
          <span className='text-[9px] font-semibold text-white/25 tracking-[0.2em] uppercase
          border border-white/10 px-1.5 py-0.5 rounded-full'>
            Admin
          </span>
        </div>
      </div>

      {/* Logout */}
      <button onClick={logOut}
        className='flex items-center gap-2 px-4 py-2 text-[12px] font-medium
        text-white/50 border border-white/[0.08] rounded-full
        hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10
        active:scale-95 transition-all duration-200'>
        Log Out
      </button>

    </div>
  )
}

export default Nav
