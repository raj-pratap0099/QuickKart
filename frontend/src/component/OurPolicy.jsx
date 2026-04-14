import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri"
import { TbRosetteDiscountCheckFilled } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"

const policies = [
  {
    icon: <RiExchangeFundsLine className='w-10 h-10 text-orange-400'/>,
    title: 'Easy Exchange Policy',
    desc: 'Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.'
  },
  {
    icon: <TbRosetteDiscountCheckFilled className='w-10 h-10 text-orange-400'/>,
    title: '7 Days Return Policy',
    desc: 'Shop with Confidence – 7 Days Easy Return Guarantee.'
  },
  {
    icon: <BiSupport className='w-10 h-10 text-orange-400'/>,
    title: 'Best Customer Support',
    desc: 'Trusted Customer Support – Your Satisfaction Is Our Priority.'
  }
]

const OurPolicy = () => {
  return (
    <section className='w-full py-16 md:py-20 bg-[#0a0a0a] border-t border-white/[0.06]'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>

        {/* Header */}
        <div className='flex flex-col items-center text-center mb-10'>
          <Title text1="OUR" text2="POLICY"/>
          <p className='text-white/40 text-[13px] mt-2 max-w-[420px] leading-relaxed'>
            Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
          </p>
          <div className='w-10 h-[2px] bg-orange-500/60 rounded-full mt-5'/>
        </div>

        {/* Policy cards — equal width grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
          {policies.map(({ icon, title, desc }) => (
            <div key={title}
              className='flex flex-col items-center text-center gap-4 px-6 py-8
              bg-white/[0.04] border border-white/[0.08] rounded-2xl
              hover:border-orange-400/25 hover:bg-white/[0.06]
              transition-all duration-300'>
              <div className='w-14 h-14 flex items-center justify-center
              bg-orange-500/10 rounded-xl'>
                {icon}
              </div>
              <p className='text-white font-semibold text-[15px] leading-snug'>{title}</p>
              <p className='text-white/45 text-[13px] leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default OurPolicy
