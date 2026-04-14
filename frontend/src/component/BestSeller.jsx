import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

const BestSeller = () => {
  let { products } = useContext(shopDataContext)
  let [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestseller)
    setBestSeller(filterProduct.slice(0, 4))
  }, [products])

  return (
    <section className='w-full py-16 md:py-20 border-t border-white/[0.06]'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>

        {/* Section header */}
        <div className='flex flex-col items-center text-center mb-10'>
          <Title text1="BEST" text2="SELLERS"/>
          <p className='text-white/40 text-[13px] mt-2 max-w-[400px] leading-relaxed'>
            Tried, Tested, Loved – Discover Our All-Time Best Sellers.
          </p>
          <div className='w-10 h-[2px] bg-orange-500/60 rounded-full mt-5'/>
        </div>

        {/* Product grid — 4 items, centered on all sizes */}
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {bestSeller.map((item, index) => (
            <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BestSeller
