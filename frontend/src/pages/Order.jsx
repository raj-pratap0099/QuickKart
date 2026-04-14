import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

const Order = () => {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { loadOrderData() }, [])

  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a] pb-24 md:pb-10'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24'>

        <div className='mb-8'>
          <Title text1='MY' text2='ORDERS'/>
        </div>

        <div className='flex flex-col gap-4'>
          {orderData.map((item, index) => (
            <div key={index}
              className='w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl
              flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5
              hover:border-white/15 transition-colors duration-200'>

              {/* Image */}
              <img src={item.image1} alt=""
                className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0'/>

              {/* Details */}
              <div className='flex-1 flex flex-col gap-1.5'>
                <p className='text-white font-semibold text-[15px] leading-snug'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5'>
                  <span className='text-orange-400 font-semibold text-[14px]'>{currency} {item.price}</span>
                  <span className='text-white/45 text-[13px]'>Qty: {item.quantity}</span>
                  <span className='px-2.5 py-0.5 bg-white/8 border border-white/10 rounded-full
                  text-white/60 text-[12px]'>{item.size}</span>
                </div>
                <div className='flex flex-wrap gap-x-4 gap-y-1 mt-1'>
                  <span className='text-white/40 text-[12px]'>
                    {new Date(item.date).toDateString()}
                  </span>
                  <span className='text-white/40 text-[12px]'>via {item.paymentMethod}</span>
                </div>
              </div>

              {/* Status + Track */}
              <div className='flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0'/>
                  <span className='text-white/70 text-[13px]'>{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className='px-4 py-1.5 bg-white/[0.06] border border-white/10 rounded-lg
                  text-white/60 hover:text-white hover:border-white/25 text-[12px] font-medium
                  transition-colors duration-200'>
                  Track Order
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Order
