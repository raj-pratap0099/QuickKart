import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState, useContext, useEffect } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

const statusConfig = {
  'Order Placed':     { dot: 'bg-blue-400',   pill: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  'Packing':          { dot: 'bg-yellow-400', pill: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  'Shipped':          { dot: 'bg-purple-400', pill: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  'Out for delivery': { dot: 'bg-orange-400', pill: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  'Delivered':        { dot: 'bg-green-400',  pill: 'text-green-400 bg-green-400/10 border-green-400/20' },
}

const Orders = () => {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status',
        { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchAllOrders() }, [])

  return (
    <div className='w-full min-h-[100vh] bg-[#080808] text-white'>
      <Nav/>

      <div className='flex'>
        <Sidebar/>

        <main className='flex-1 ml-[60px] md:ml-[200px] pt-[64px] min-h-[100vh]'>
          <div className='w-full max-w-[1100px] mx-auto px-6 md:px-10 py-10'>

            {/* Page header */}
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h1 className='text-[20px] font-bold text-white tracking-tight'>All Orders</h1>
                <p className='text-[12px] text-white/30 mt-0.5'>{orders.length} orders total</p>
              </div>
              <div className='flex items-center gap-2 px-3 py-1.5 bg-green-400/10
              border border-green-400/20 rounded-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-400
                shadow-[0_0_6px_rgba(74,222,128,0.8)]'/>
                <span className='text-[11px] text-green-400 font-medium'>Live</span>
              </div>
            </div>

            {/* Orders list */}
            <div className='flex flex-col gap-4'>
              {orders.map((order, index) => {
                const sc = statusConfig[order.status] || { dot: 'bg-white/30', pill: 'text-white/50 bg-white/5 border-white/10' }
                return (
                  <div key={index}
                    className='w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 md:p-6
                    hover:bg-white/[0.055] hover:border-white/[0.13] hover:scale-[1.005]
                    hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                    transition-all duration-300 ease-out'>

                    <div className='flex flex-col lg:flex-row lg:items-start gap-6'>

                      {/* Order icon */}
                      <div className='flex-shrink-0 w-11 h-11 rounded-xl
                      bg-orange-500/10 border border-orange-500/20
                      flex items-center justify-center'>
                        <SiEbox className='w-5 h-5 text-orange-400'/>
                      </div>

                      {/* Items + Address — 2 col grid */}
                      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-5'>

                        {/* Items */}
                        <div>
                          <p className='text-[10px] font-semibold text-white/25
                          tracking-[0.18em] uppercase mb-2'>Items</p>
                          <div className='flex flex-col gap-1.5'>
                            {order.items.map((item, i) => (
                              <div key={i} className='flex items-center gap-2 flex-wrap'>
                                <span className='text-[13px] text-white/80 font-medium'>
                                  {item.name}
                                </span>
                                <span className='text-[12px] text-white/35'>
                                  × {item.quantity}
                                  {i < order.items.length - 1 ? ',' : ''}
                                </span>
                                <span className='px-2 py-0.5 bg-white/[0.06] border border-white/[0.09]
                                rounded-md text-[10px] text-white/45 font-medium'>
                                  {item.size}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <p className='text-[10px] font-semibold text-white/25
                          tracking-[0.18em] uppercase mb-2'>Delivery</p>
                          <p className='text-[13px] text-white/75 font-semibold'>
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <p className='text-[12px] text-white/35 leading-relaxed mt-0.5'>
                            {order.address.street}, {order.address.city},{' '}
                            {order.address.state}, {order.address.country} — {order.address.pinCode}
                          </p>
                          <p className='text-[12px] text-white/35 mt-0.5'>{order.address.phone}</p>
                        </div>

                      </div>

                      {/* Meta details */}
                      <div className='flex-shrink-0 flex flex-col gap-1.5 min-w-[130px]'>
                        <p className='text-[10px] font-semibold text-white/25
                        tracking-[0.18em] uppercase mb-1'>Details</p>

                        {[
                          ['Items', order.items.length],
                          ['Method', order.paymentMethod],
                          ['Date', new Date(order.date).toLocaleDateString()],
                        ].map(([label, val]) => (
                          <p key={label} className='text-[12px] text-white/40'>
                            <span className='text-white/20'>{label}: </span>{val}
                          </p>
                        ))}

                        <p className='text-[12px] text-white/40'>
                          <span className='text-white/20'>Payment: </span>
                          <span className={order.payment ? 'text-green-400' : 'text-yellow-400'}>
                            {order.payment ? 'Done' : 'Pending'}
                          </span>
                        </p>

                        <p className='text-[16px] font-bold text-orange-400 mt-2'>
                          ₹ {order.amount}
                        </p>
                      </div>

                      {/* Status */}
                      <div className='flex-shrink-0 flex flex-col gap-2.5 min-w-[140px]'>
                        <p className='text-[10px] font-semibold text-white/25
                        tracking-[0.18em] uppercase'>Status</p>

                        {/* Colored pill */}
                        <div className={`flex items-center gap-1.5 w-fit px-2.5 py-1
                        rounded-full border text-[11px] font-semibold ${sc.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`}/>
                          {order.status}
                        </div>

                        {/* Dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) => statusHandler(e, order._id)}
                          className='px-3 py-2 text-[12px] font-medium text-white/60
                          bg-white/[0.05] border border-white/[0.1] rounded-lg outline-none
                          hover:border-orange-400/50 focus:border-orange-400/60
                          transition-colors duration-200 cursor-pointer'>
                          <option value="Order Placed"     className='bg-[#111]'>Order Placed</option>
                          <option value="Packing"          className='bg-[#111]'>Packing</option>
                          <option value="Shipped"          className='bg-[#111]'>Shipped</option>
                          <option value="Out for delivery" className='bg-[#111]'>Out for delivery</option>
                          <option value="Delivered"        className='bg-[#111]'>Delivered</option>
                        </select>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Orders
