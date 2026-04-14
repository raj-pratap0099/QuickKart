import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

const About = () => {
  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a]'>

      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24 flex flex-col gap-16'>

        {/* Title */}
        <div className='flex flex-col items-center'>
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        {/* About Section */}
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-center'>

          <div className='lg:w-[45%] w-full flex items-center justify-center'>
            <img
              src={about}
              alt="About"
              className='w-full max-w-[480px] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] object-cover'
            />
          </div>

          <div className='lg:w-[45%] w-full flex flex-col gap-5'>
            <p className='text-white/60 md:text-[15px] text-[13px] leading-relaxed'>
              QuickCart born for smart, seamless shopping—created to deliver quality products, trending styles,
              and everyday essentials in one place. With reliable service, fast delivery, and great value,
              QuickCart makes your online shopping experience simple, satisfying, and stress-free.
            </p>

            <p className='text-white/60 md:text-[15px] text-[13px] leading-relaxed'>
              Built for modern shoppers—combining style, convenience, and affordability. Whether it's fashion,
              essentials, or trends, we bring everything you need to one trusted platform with fast delivery,
              easy returns, and a customer-first shopping experience you'll love.
            </p>

            <div className='w-12 h-[3px] bg-orange-500 rounded-full' />

            <p className='text-white font-bold text-[17px]'>Our Mission</p>

            <p className='text-white/60 md:text-[15px] text-[13px] leading-relaxed'>
              Our mission is to redefine online shopping by delivering quality, affordability, and convenience.
              QuickCart connects customers with trusted products and brands, offering a seamless, customer-focused
              experience that saves time, adds value, and fits every lifestyle and need.
            </p>
          </div>

        </div>

        {/* Why Choose Us */}
        <div className='flex flex-col items-center gap-8'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />

          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                title: 'Quality Assurance',
                desc: 'We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.'
              },
              {
                title: 'Convenience',
                desc: 'Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.'
              },
              {
                title: 'Exceptional Customer Service',
                desc: 'Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.'
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className='flex flex-col items-center justify-center gap-4
                bg-white/5 border border-white/10 rounded-xl px-8 py-10 text-center
                hover:border-orange-400/30 transition-all duration-300'
              >
                <p className='text-[18px] font-bold text-orange-400'>{title}</p>
                <p className='text-white/55 text-[14px] leading-relaxed'>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Newsletter OUTSIDE container */}
      <NewLetterBox />

    </div>
  )
}

export default About