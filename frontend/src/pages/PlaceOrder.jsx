import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

const inputClass = `w-full h-[44px] bg-white/[0.06] border border-white/[0.1] rounded-xl
px-4 text-white placeholder:text-white/30 text-[13px] outline-none
focus:border-orange-400/60 transition-colors duration-200`

const PlaceOrder = () => {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    pinCode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) { navigate("/order"); setCartItem({}) }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          console.log(result.data)
          if (result.data) { setCartItem({}); toast.success("Order Placed"); navigate("/order"); setLoading(false) }
          else { console.log(result.data.message); toast.error("Order Placed Error"); setLoading(false) }
          break
        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) { initPay(resultRazorpay.data); toast.success("Order Placed"); setLoading(false) }
          break
        default: break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a] pb-24 md:pb-16'>
      <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24'>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start'>

          {/* Left — Delivery Form */}
          <div>
            <div className='mb-6'>
              <Title text1='DELIVERY' text2='INFORMATION'/>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-3'>

              <div className='grid grid-cols-2 gap-3'>
                <input className={inputClass} type="text" placeholder='First name'
                  required name='firstName' value={formData.firstName} onChange={onChangeHandler}/>
                <input className={inputClass} type="text" placeholder='Last name'
                  required name='lastName' value={formData.lastName} onChange={onChangeHandler}/>
              </div>

              <input className={inputClass} type="email" placeholder='Email address'
                required name='email' value={formData.email} onChange={onChangeHandler}/>

              <input className={inputClass} type="text" placeholder='Street'
                required name='street' value={formData.street} onChange={onChangeHandler}/>

              <div className='grid grid-cols-2 gap-3'>
                <input className={inputClass} type="text" placeholder='City'
                  required name='city' value={formData.city} onChange={onChangeHandler}/>
                <input className={inputClass} type="text" placeholder='State'
                  required name='state' value={formData.state} onChange={onChangeHandler}/>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <input className={inputClass} type="text" placeholder='Pincode'
                  required name='pinCode' value={formData.pinCode} onChange={onChangeHandler}/>
                <input className={inputClass} type="text" placeholder='Country'
                  required name='country' value={formData.country} onChange={onChangeHandler}/>
              </div>

              <input className={inputClass} type="text" placeholder='Phone'
                required name='phone' value={formData.phone} onChange={onChangeHandler}/>

              <button type='submit'
                className='mt-4 w-full h-[46px] bg-orange-500 hover:bg-orange-400 active:scale-[0.98]
                text-white font-semibold text-[14px] rounded-xl transition-all duration-200
                shadow-md shadow-orange-500/25 flex items-center justify-center'>
                {loading ? <Loading/> : 'Place Order'}
              </button>

            </form>
          </div>

          {/* Right — Summary + Payment */}
          <div className='flex flex-col gap-6'>

            <CartTotal/>

            <div>
              <div className='mb-4'>
                <Title text1='PAYMENT' text2='METHOD'/>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>

                {/* Razorpay */}
                <button onClick={() => setMethod('razorpay')}
                  className={`flex-1 h-[52px] rounded-xl border-2 overflow-hidden transition-all duration-200
                  ${method === 'razorpay' ? 'border-orange-500 shadow-md shadow-orange-500/20' : 'border-white/10 hover:border-white/25'}`}>
                  <img src={razorpay} className='w-full h-full object-cover' alt="Razorpay"/>
                </button>

                {/* COD */}
                <button onClick={() => setMethod('cod')}
                  className={`flex-1 h-[52px] rounded-xl border-2 font-semibold text-[13px]
                  transition-all duration-200
                  ${method === 'cod'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-md shadow-orange-500/20'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'}`}>
                  Cash on Delivery
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
