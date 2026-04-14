import React from 'react'
import Title from '../component/Title.jsx'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox.jsx'

const Contact = () => {
  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a]'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24 pb-16 flex flex-col gap-16'>

        <div className='flex flex-col items-center'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-center'>

          <div className='lg:w-[45%] w-full flex items-center justify-center'>
            <img src={contact} alt=""
              className='w-full max-w-[480px] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] object-cover'/>
          </div>

          <div className='lg:w-[45%] w-full flex flex-col gap-5'>
            <p className='text-white font-bold text-[17px]'>Our Store</p>
            <div className='text-white/60 text-[14px] leading-relaxed'>
              <p>12345 Dholakpur Station</p>
              <p>Furfuri Nagar city, State, India</p>
            </div>
            <div className='text-white/60 text-[14px] leading-relaxed'>
              <p>Tel: +91-98765XXXX</p>
              <p>Email: admin@quickcart.com</p>
            </div>
            <div className='w-12 h-[2px] bg-orange-500/70 rounded-full'/>
            <p className='text-white font-bold text-[17px]'>Careers at QuickCart</p>
            <p className='text-white/60 text-[14px]'>Learn more about our teams and job openings</p>
            <button className='w-fit px-7 py-2.5 border border-orange-400/50 text-orange-400 rounded-full
            text-[13px] font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500
            active:scale-95 transition-all duration-200'>
              Explore Jobs
            </button>
          </div>

        </div>

      </div>
      <NewLetterBox/>
    </div>
  )
}

export default Contact
