import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

const Home = () => {

  let heroData = [
    { text1: "30% OFF Limited Offer",            text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection",       text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit",   text2: "Now on Sale!" },
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='overflow-x-hidden pt-[68px]'>

      {/* Hero wrapper — relative so both children can use absolute */}
      <div className='relative w-full h-[44vh] sm:h-[56vh] md:h-[68vh] lg:h-[calc(100vh-68px)]
      overflow-hidden bg-[#0c2025]'>

        {/* Layer 1 — background image (behind everything) */}
        <Background heroCount={heroCount} />

        {/* Layer 2 — dark gradient so text is readable */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

        {/* Layer 3 — hero text (on top of image and gradient) */}
        <div className='absolute inset-0 z-10'>
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>

      </div>

      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>

    </div>
  )
}

export default Home
