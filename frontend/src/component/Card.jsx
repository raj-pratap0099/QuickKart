import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Card = ({ name, image, id, price }) => {
  let { currency } = useContext(shopDataContext)
  let navigate = useNavigate()

  return (
    <div
      className='w-full bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden
      cursor-pointer group transition-all duration-300 ease-out
      hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      hover:-translate-y-0.5'
      onClick={() => navigate(`/productdetail/${id}`)}>

      {/* Image — fixed aspect ratio */}
      <div className='w-full aspect-[3/4] overflow-hidden bg-[#1a1a1a]'>
        <img
          src={image} alt={name}
          className='w-full h-full object-cover
          group-hover:scale-105 transition-transform duration-500 ease-out'/>
      </div>

      {/* Info */}
      <div className='px-3.5 py-3 flex flex-col gap-1'>
        <p className='text-white/80 text-[13px] font-medium leading-snug line-clamp-1
        group-hover:text-white transition-colors duration-200'>{name}</p>
        <div className='flex items-center justify-between mt-0.5'>
          <p className='text-orange-400 text-[13px] font-semibold'>{currency} {price}</p>
          <span className='text-[10px] text-white/25 group-hover:text-orange-400/60
          transition-colors duration-200'>View →</span>
        </div>
      </div>

    </div>
  )
}

export default Card
