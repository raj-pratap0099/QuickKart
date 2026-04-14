import React from 'react'

const NewLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className='w-full py-16 md:py-20 bg-[#0a0a0a] border-t border-white/[0.06]'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>

        <div className='flex flex-col items-center text-center gap-3 mb-8'>
          <p className='text-[20px] md:text-[26px] text-white font-bold tracking-tight'>
            Subscribe & get <span className='text-orange-400'>20% off</span>
          </p>
          <p className='text-[13px] text-white/45 max-w-[380px] leading-relaxed'>
            Exclusive savings, special deals, and early access to new collections.
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full'>
          <input
            type="text"
            placeholder='Enter your email address'
            className='w-full sm:w-[340px] h-[44px] bg-white/[0.07] border border-white/15
            rounded-full px-5 text-white placeholder:text-white/30 text-[13px]
            outline-none focus:border-orange-400/50 transition-colors duration-200'
            required/>
          <button type='submit'
            className='w-full sm:w-auto h-[44px] px-7 bg-orange-500 hover:bg-orange-400
            active:scale-[0.97] text-white font-semibold text-[13px] rounded-full
            shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35
            transition-all duration-300 whitespace-nowrap'>
            Subscribe
          </button>
        </form>

      </div>
    </section>
  )
}

export default NewLetterBox
