import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <Title text1='CART' text2='TOTALS'/>
      </div>
      <div className='bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden'>
        <div className='flex justify-between items-center px-5 py-4 text-[14px]'>
          <span className='text-white/55'>Subtotal</span>
          <span className='text-white font-medium'>{currency} {getCartAmount()}.00</span>
        </div>
        <div className='h-px bg-white/[0.06] mx-5'/>
        <div className='flex justify-between items-center px-5 py-4 text-[14px]'>
          <span className='text-white/55'>Shipping Fee</span>
          <span className='text-white font-medium'>{currency} {delivery_fee}</span>
        </div>
        <div className='h-px bg-white/[0.06] mx-5'/>
        <div className='flex justify-between items-center px-5 py-4'>
          <span className='text-white font-semibold text-[15px]'>Total</span>
          <span className='text-orange-400 font-bold text-[15px]'>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
