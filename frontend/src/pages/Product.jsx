import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

const Product = () => {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-[#0d0d0d] flex flex-col items-center'>
      <LatestCollection/>
      <BestSeller/>
    </div>
  )
}

export default Product
