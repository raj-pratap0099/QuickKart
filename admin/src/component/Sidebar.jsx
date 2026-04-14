import { IoMdAddCircleOutline } from "react-icons/io"
import { FaRegListAlt } from "react-icons/fa"
import { SiTicktick } from "react-icons/si"
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  let navigate = useNavigate()
  let location = useLocation()

  const isActive = (path) => location.pathname === path

  const links = [
    { icon: <IoMdAddCircleOutline className='w-[18px] h-[18px]'/>, label: 'Add Items',   path: '/add' },
    { icon: <FaRegListAlt         className='w-[18px] h-[18px]'/>, label: 'List Items',  path: '/lists' },
    { icon: <SiTicktick           className='w-[18px] h-[18px]'/>, label: 'View Orders', path: '/orders' },
  ]

  return (
    <div className='w-[60px] md:w-[200px] min-h-[100vh] fixed left-0 top-0 z-40
    bg-[#080808]/96 backdrop-blur-xl border-r border-white/[0.07] pt-[64px]'>

      {/* Brand label on sidebar top */}
      <div className='hidden md:flex items-center px-5 py-4 border-b border-white/[0.06]'>
        <span className='text-[11px] font-semibold text-white/20 tracking-[0.2em] uppercase'>
          Navigation
        </span>
      </div>

      <nav className='flex flex-col gap-1 px-2.5 py-4'>
        {links.map(({ icon, label, path }) => (
          <button key={path} onClick={() => navigate(path)}
            className={`w-full flex items-center justify-center md:justify-start gap-3
            px-3 py-2.5 rounded-xl text-[13px] font-medium
            transition-all duration-200 ease-out group
            ${isActive(path)
              ? 'bg-orange-500/15 text-orange-400 border border-orange-500/25 shadow-sm'
              : 'text-white/40 border border-transparent hover:text-white/80 hover:bg-white/[0.06]'
            }`}>

            <span className={`flex-shrink-0 transition-colors duration-200
              ${isActive(path) ? 'text-orange-400' : 'text-white/35 group-hover:text-white/65'}`}>
              {icon}
            </span>

            <span className='hidden md:block flex-1 text-left'>{label}</span>

            {isActive(path) && (
              <span className='hidden md:block w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0'/>
            )}
          </button>
        ))}
      </nav>

    </div>
  )
}

export default Sidebar
