import React from 'react'

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className='w-full h-full flex flex-col justify-end md:justify-center
    px-6 sm:px-10 lg:px-16 pb-14 md:pb-0'>

      <div className='flex flex-col gap-5 max-w-[600px]'>

        {/* Badge */}
        <span className='w-fit inline-flex items-center bg-orange-500/15 border border-orange-400/30
        text-orange-300 text-[10px] font-semibold tracking-[0.18em] uppercase
        px-3.5 py-1.5 rounded-full backdrop-blur-sm'>
          New Collection
        </span>

        {/* Headline */}
        <div className='flex flex-col gap-1'>
          <h1 className='text-white font-bold leading-[1.15] tracking-tight
            text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px]
            drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]'>
            {heroData.text1}
          </h1>
          <h2 className='text-orange-400 font-semibold leading-[1.2] tracking-tight
            text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]'>
            {heroData.text2}
          </h2>
        </div>

        {/* Divider */}
        <div className='w-10 h-[2px] bg-orange-500/70 rounded-full' />

        {/* CTA */}
        <div className='flex items-center gap-5'>
          <button className='bg-orange-500 hover:bg-orange-400 active:scale-[0.97]
            transition-all duration-300 ease-out text-white font-semibold
            text-[12px] md:text-[13px] tracking-wide px-6 py-2.5 rounded-full
            shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40'>
            Shop Now →
          </button>
          <span className='text-white/35 text-[11px] tracking-wide hidden md:inline'>
            Free delivery on orders over ₹999
          </span>
        </div>

        {/* Slide indicators */}
        <div className='flex items-center gap-2'>
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setHeroCount(i)}
              className={`rounded-full transition-all duration-300 ease-out focus:outline-none
                ${heroCount === i
                  ? 'w-6 h-[6px] bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                  : 'w-[6px] h-[6px] bg-white/25 hover:bg-white/50'
                }`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Hero
