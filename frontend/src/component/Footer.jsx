import React from 'react'
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className='w-full bg-[#080808] border-t border-white/[0.06] mb-[60px] md:mb-0'>

      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-12 md:py-14'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12'>

          {/* Brand — spans full width on mobile */}
          <div className='col-span-2 md:col-span-1 flex flex-col gap-4'>
            <div className='flex items-center gap-2.5'>
              <img src={logo} alt="" className='w-7 h-7 object-contain'/>
              <span className='text-[16px] font-bold text-white'>
                Quick<span className='text-orange-400'>Cart</span>
              </span>
            </div>
            <p className='text-[13px] text-white/40 leading-relaxed max-w-[260px] hidden md:block'>
              Your all-in-one online shopping destination — quality products,
              unbeatable deals, and fast delivery backed by trusted service.
            </p>
            <p className='text-[12px] text-white/40 md:hidden'>
              Fast. Easy. Reliable.
            </p>
          </div>

          {/* Company */}
          <div className='flex flex-col gap-4'>
            <p className='text-[11px] font-semibold text-white/60 tracking-[0.15em] uppercase'>
              Company
            </p>
            <ul className='flex flex-col gap-2.5'>
              {['Home', 'About us', 'Delivery', 'Privacy Policy'].map(item => (
                <li key={item}
                  className='text-[13px] text-white/40 hover:text-orange-400
                  cursor-pointer transition-colors duration-200'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='flex flex-col gap-4'>
            <p className='text-[11px] font-semibold text-white/60 tracking-[0.15em] uppercase'>
              Get In Touch
            </p>
            <ul className='flex flex-col gap-2.5'>
              {['+91-8874XXXXXX', 'contact@quickcart.com', '+1-123-456-XXxX', 'admin@quickcart.com'].map(item => (
                <li key={item} className='text-[13px] text-white/40'>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/[0.06]'>
        <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-center'>
          <p className='text-[11px] text-white/25'>
            Copyright 2025 © quickcart.com — All Rights Reserved
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
