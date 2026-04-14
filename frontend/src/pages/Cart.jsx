import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({ _id: items, size: item, quantity: cartItem[items][item] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a] pb-24 md:pb-10'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24'>

      <div className='mb-8'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className='w-full flex flex-col gap-4'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='w-full bg-white/5 border border-white/10 rounded-2xl
            flex items-center gap-5 py-4 px-5 relative hover:border-white/20 transition-colors duration-200'>

              <img className='w-[90px] h-[90px] rounded-xl object-cover flex-shrink-0' src={productData.image1} alt=""/>

              <div className='flex flex-col gap-2 flex-1'>
                <p className='md:text-[18px] text-[15px] text-white font-medium'>{productData.name}</p>
                <div className='flex items-center gap-4'>
                  <p className='text-orange-400 font-semibold text-[15px]'>{currency} {productData.price}</p>
                  <span className='px-3 py-1 text-[12px] text-white/70 bg-white/10 border border-white/20 rounded-full'>
                    {item.size}
                  </span>
                </div>
              </div>

              <input type="number" min={1} defaultValue={item.quantity}
                className='w-[70px] h-[40px] text-center text-white text-[15px] font-semibold
                bg-white/10 border border-white/20 rounded-lg outline-none focus:border-orange-400
                transition-colors duration-200'
                onChange={(e) => (e.target.value === ' ' || e.target.value === '0')
                  ? null : updateQuantity(item._id, item.size, Number(e.target.value))}/>

              <RiDeleteBin6Line
                className='text-white/40 hover:text-red-400 w-[22px] h-[22px] cursor-pointer transition-colors duration-200 flex-shrink-0'
                onClick={() => updateQuantity(item._id, item.size, 0)}/>

            </div>
          )
        })}
      </div>

      <div className='flex justify-start items-end mt-12 mb-4'>
        <div className='w-full sm:w-[420px]'>
          <CartTotal/>
          <button
            className='mt-5 ml-1 px-8 py-3 bg-orange-500 hover:bg-orange-400 active:scale-95
            text-white font-semibold text-[15px] rounded-full shadow-lg shadow-orange-500/30
            transition-all duration-200'
            onClick={() => { if (cartData.length > 0) navigate("/placeorder") }}>
            Proceed to Checkout →
          </button>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Cart
