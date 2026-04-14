import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

const LatestCollection = () => {
  let { products } = useContext(shopDataContext)
  let [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <section className='w-full py-16 md:py-20'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>

        {/* Section header */}
        <div className='flex flex-col items-center text-center mb-10'>
          <Title text1="LATEST" text2="COLLECTIONS"/>
          <p className='text-white/40 text-[13px] mt-2 max-w-[400px] leading-relaxed'>
            Step Into Style – New Collection Dropping This Season!
          </p>
          <div className='w-10 h-[2px] bg-orange-500/60 rounded-full mt-5'/>
        </div>

        {/* Product grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {latestProducts.map((item, index) => (
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LatestCollection
