import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-baseline gap-2 mb-2'>
      <h2 className='text-[26px] md:text-[32px] font-bold text-white/80 tracking-tight'>
        {text1}
      </h2>
      <h2 className='text-[26px] md:text-[32px] font-bold text-orange-400 tracking-tight'>
        {text2}
      </h2>
    </div>
  )
}

export default Title
