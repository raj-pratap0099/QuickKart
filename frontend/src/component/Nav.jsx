import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5"
import { FaCircleUser } from "react-icons/fa6"
import { IoSearchCircleSharp } from "react-icons/io5"
import { MdOutlineShoppingCart } from "react-icons/md"
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { IoMdHome } from "react-icons/io"
import { HiOutlineCollection } from "react-icons/hi"
import { MdContacts } from "react-icons/md"
import { shopDataContext } from '../context/ShopContext'

const Nav = () => {
   let {getCurrentUser,userData , setUserData} = useContext(userDataContext)
      let {showSearch , setShowSearch , search ,setSearch,getCartCount} = useContext(shopDataContext)
      let [showProfile,setShowProfile] = useState(false)
      let {serverUrl} = useContext(authDataContext)
      let navigate = useNavigate() 
      let location = useLocation()

      const handleLogOut = async () => {
         try {
           const result = await axios.get(serverUrl+"/api/auth/logOut" , 
                    {withCredentials:true})

          console.log(result.data)
          setUserData(null);
          // await getCurrentUser() 
          navigate("/login")

         } catch(error) {
              console.log(error)
         }
      }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collection' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]


  const isActive = (path) => location.pathname === path

  return (
    <div className='w-full h-[68px] fixed top-0 z-50 bg-[#080808]/96 backdrop-blur-xl
    border-b border-white/[0.06]'>

      {/* Inner container — max-width aligned with content */}
      <div className='w-full max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-8'>

        {/* Logo */}
        <div className='flex items-center gap-2.5 cursor-pointer group flex-shrink-0'
          onClick={() => navigate('/')}>
          <img src={logo} alt="" className='w-7 h-7 object-contain
          group-hover:scale-105 transition-transform duration-200'/>
          <span className='text-[17px] font-bold text-white tracking-tight'>
            Quick<span className='text-orange-400'>Cart</span>
          </span>
        </div>

        {/* Desktop Nav Links — centered */}
        <nav className='hidden md:flex items-center gap-0.5'>
          {navLinks.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`relative text-[13px] font-medium px-4 py-2 rounded-lg
              transition-colors duration-200 group
              ${isActive(path) ? 'text-white' : 'text-white/45 hover:text-white/85'}`}>
              {label}
              <span className={`absolute bottom-[5px] left-4 right-4 h-[1.5px] rounded-full
              bg-orange-400 transition-all duration-300 origin-left
              ${isActive(path)
                ? 'scale-x-100 opacity-100'
                : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`}/>
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className='flex items-center gap-2.5'>

          {/* Search toggle */}
          {!showSearch
            ? <button className='p-1.5 rounded-lg hover:bg-white/8 transition-colors duration-200'
                onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }}>
                <IoSearchCircleOutline className='w-[26px] h-[26px] text-white/50 hover:text-white transition-colors duration-200'/>
              </button>
            : <button className='p-1.5 rounded-lg bg-orange-500/10 transition-colors duration-200'
                onClick={() => setShowSearch(prev => !prev)}>
                <IoSearchCircleSharp className='w-[26px] h-[26px] text-orange-400'/>
              </button>
          }

          {/* Profile */}
          {!userData
            ? <button className='p-1.5 rounded-lg hover:bg-white/8 transition-colors duration-200'
                onClick={() => setShowProfile(prev => !prev)}>
                <FaCircleUser className='w-[24px] h-[24px] text-white/50 hover:text-white transition-colors duration-200'/>
              </button>
            : <button
                className='w-8 h-8 bg-orange-500 hover:bg-orange-400 text-white rounded-full
                flex items-center justify-center font-bold text-[13px]
                transition-colors duration-200 shadow-sm shadow-orange-500/40'
                onClick={() => setShowProfile(prev => !prev)}>
                {userData?.name.slice(0, 1).toUpperCase()}
              </button>
          }

          {/* Cart */}
          <button className='relative p-1.5 rounded-lg hover:bg-white/8 transition-colors duration-200 hidden md:flex'
            onClick={() => navigate("/cart")}>
            <MdOutlineShoppingCart className='w-[24px] h-[24px] text-white/50 hover:text-white transition-colors duration-200'/>
            <span className='absolute top-0 right-0 w-[16px] h-[16px] flex items-center
            justify-center bg-orange-500 text-white rounded-full text-[8px] font-bold'>
              {getCartCount()}
            </span>
          </button>

          {/* Search dropdown */}
          {showSearch &&
            <div className='absolute top-[68px] left-0 w-full h-[60px] bg-[#080808]/98
            border-b border-white/[0.06] flex items-center justify-center backdrop-blur-xl'>
              <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>
                <input
                  type="text"
                  autoFocus
                  className='w-full max-w-[480px] h-[38px] bg-white/[0.07] border border-white/15
                  rounded-full pl-5 pr-4 text-white placeholder:text-white/30 text-[13px]
                  outline-none focus:border-orange-400/50 transition-colors duration-200'
                  placeholder='Search products...'
                  value={search ?? ""}
                  onChange={(e) => setSearch(e.target.value)}/>
              </div>
            </div>
          }

          {/* Profile dropdown */}
          {showProfile &&
            <div className='absolute top-[72px] right-4 lg:right-[calc((100vw-1200px)/2+32px)]
            w-[180px] bg-[#111] border border-white/10 rounded-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-50'>
              <ul className='flex flex-col py-1 text-[13px]'>
                {!userData &&
                  <li className='px-4 py-2.5 text-white/65 hover:text-white hover:bg-white/[0.07]
                  cursor-pointer transition-colors duration-150'
                    onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
                }
                {userData &&
                  <li className='px-4 py-2.5 text-white/65 hover:text-white hover:bg-white/[0.07]
                  cursor-pointer transition-colors duration-150'
                    onClick={() => { handleLogOut(); setShowProfile(false) }}>Log Out</li>
                }
                <li className='px-4 py-2.5 text-white/65 hover:text-white hover:bg-white/[0.07]
                cursor-pointer transition-colors duration-150'
                  onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
                <li className='px-4 py-2.5 text-white/65 hover:text-white hover:bg-white/[0.07]
                cursor-pointer transition-colors duration-150'
                  onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
              </ul>
            </div>
          }

        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className='w-full h-[60px] fixed bottom-0 left-0 flex items-center justify-around
      bg-[#080808]/98 backdrop-blur-xl border-t border-white/[0.06] md:hidden px-4'>
        {[
          { icon: <IoMdHome className='w-5 h-5'/>, label: 'Home', path: '/' },
          { icon: <HiOutlineCollection className='w-5 h-5'/>, label: 'Collections', path: '/collection' },
          { icon: <MdContacts className='w-5 h-5'/>, label: 'Contact', path: '/contact' },
        ].map(({ icon, label, path }) => (
          <button key={label} onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg
            transition-colors duration-200
            ${isActive(path) ? 'text-orange-400' : 'text-white/35 hover:text-white/70'}`}>
            {icon}
            <span className='text-[9px] font-medium'>{label}</span>
          </button>
        ))}
        <button onClick={() => navigate("/cart")}
          className={`relative flex flex-col items-center gap-1 px-3 py-1 rounded-lg
          transition-colors duration-200
          ${isActive('/cart') ? 'text-orange-400' : 'text-white/35 hover:text-white/70'}`}>
          <MdOutlineShoppingCart className='w-5 h-5'/>
          <span className='text-[9px] font-medium'>Cart</span>
          <span className='absolute -top-0.5 right-1 w-[14px] h-[14px] flex items-center
          justify-center bg-orange-500 text-white rounded-full text-[8px] font-bold'>
            {getCartCount()}
          </span>
        </button>
      </div>

    </div>
  )
}

export default Nav
