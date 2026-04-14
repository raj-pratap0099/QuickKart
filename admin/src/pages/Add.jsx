import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

const inputClass = `w-full h-[42px] bg-white/[0.05] border border-white/[0.1] rounded-xl
px-4 text-white placeholder:text-white/25 text-[13px] outline-none
focus:border-orange-400/50 hover:border-white/20 transition-colors duration-200`

const selectClass = `bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2
text-white/70 text-[13px] outline-none focus:border-orange-400/50
hover:border-white/20 transition-colors duration-200 cursor-pointer`

const Add = () => {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  let { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct",
        formData, { withCredentials: true })

      console.log(result.data)
      toast.success("ADD Product Successfully")
      setLoading(false)

      if (result.data) {
        setName(""); setDescription(""); setImage1(false); setImage2(false)
        setImage3(false); setImage4(false); setPrice(""); setBestSeller(false)
        setCategory("Men"); setSubCategory("TopWear")
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  const sizeList = ["S", "M", "L", "XL", "XXL"]

  return (
    <div className='w-full min-h-[100vh] bg-[#080808] text-white'>
      <Nav/>
      <div className='flex'>
        <Sidebar/>

        <main className='flex-1 ml-[60px] md:ml-[200px] pt-[64px] min-h-[100vh]'>
          <div className='w-full max-w-[760px] mx-auto px-6 md:px-10 py-10'>

            <div className='mb-8'>
              <h1 className='text-[20px] font-bold text-white tracking-tight'>Add Product</h1>
              <p className='text-[12px] text-white/30 mt-0.5'>Fill in the details to list a new product</p>
            </div>

            <form onSubmit={handleAddProduct} className='flex flex-col gap-7'>

              {/* Upload Images */}
              <div className='flex flex-col gap-3'>
                <label className='text-[13px] font-semibold text-white/60 tracking-wide uppercase text-[11px]'>
                  Product Images
                </label>
                <div className='flex items-center gap-3 flex-wrap'>
                  {[
                    { id: 'image1', state: image1, setter: setImage1 },
                    { id: 'image2', state: image2, setter: setImage2 },
                    { id: 'image3', state: image3, setter: setImage3 },
                    { id: 'image4', state: image4, setter: setImage4 },
                  ].map(({ id, state, setter }) => (
                    <label key={id} htmlFor={id}
                      className='w-[80px] h-[80px] rounded-xl overflow-hidden cursor-pointer
                      border border-white/[0.1] hover:border-orange-400/50
                      transition-colors duration-200 flex-shrink-0'>
                      <img src={!state ? upload : URL.createObjectURL(state)}
                        alt="" className='w-full h-full object-cover'/>
                      <input type="file" id={id} hidden
                        onChange={(e) => setter(e.target.files[0])} required/>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className='flex flex-col gap-2'>
                <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                  Product Name
                </label>
                <input type="text" className={inputClass} placeholder='e.g. Classic White Shirt'
                  onChange={(e) => setName(e.target.value)} value={name} required/>
              </div>

              {/* Description */}
              <div className='flex flex-col gap-2'>
                <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                  Description
                </label>
                <textarea className={`${inputClass} h-[90px] py-3 resize-none`}
                  placeholder='Product description...'
                  onChange={(e) => setDescription(e.target.value)} value={description} required/>
              </div>

              {/* Category + SubCategory */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                    Category
                  </label>
                  <select className={selectClass} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men"   className='bg-[#111]'>Men</option>
                    <option value="Women" className='bg-[#111]'>Women</option>
                    <option value="Kids"  className='bg-[#111]'>Kids</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                    Sub-Category
                  </label>
                  <select className={selectClass} onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="TopWear"    className='bg-[#111]'>TopWear</option>
                    <option value="BottomWear" className='bg-[#111]'>BottomWear</option>
                    <option value="WinterWear" className='bg-[#111]'>WinterWear</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className='flex flex-col gap-2'>
                <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                  Price (₹)
                </label>
                <input type="number" className={`${inputClass} max-w-[200px]`} placeholder='2000'
                  onChange={(e) => setPrice(e.target.value)} value={price} required/>
              </div>

              {/* Sizes */}
              <div className='flex flex-col gap-3'>
                <label className='text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase'>
                  Sizes
                </label>
                <div className='flex items-center gap-2 flex-wrap'>
                  {sizeList.map(size => (
                    <button key={size} type='button'
                      onClick={() => setSizes(prev =>
                        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                      className={`px-4 py-2 rounded-xl text-[13px] font-semibold
                      border transition-all duration-200
                      ${sizes.includes(size)
                        ? 'bg-orange-500/20 border-orange-400/50 text-orange-400'
                        : 'bg-white/[0.04] border-white/[0.1] text-white/50 hover:border-white/25 hover:text-white/80'
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bestseller */}
              <label className='flex items-center gap-3 cursor-pointer w-fit group'>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center
                transition-all duration-200
                ${bestseller
                  ? 'bg-orange-500 border-orange-500'
                  : 'bg-white/[0.05] border-white/[0.15] group-hover:border-white/30'}`}
                  onClick={() => setBestSeller(prev => !prev)}>
                  {bestseller && <span className='text-white text-[11px] font-bold'>✓</span>}
                </div>
                <input type="checkbox" className='hidden' onChange={() => setBestSeller(prev => !prev)}/>
                <span className='text-[13px] font-medium text-white/60 group-hover:text-white/80
                transition-colors duration-200'>
                  Add to Bestsellers
                </span>
              </label>

              {/* Submit */}
              <button type='submit'
                className='w-full sm:w-[180px] h-[44px] bg-orange-500 hover:bg-orange-400
                active:scale-[0.97] text-white font-semibold text-[13px] rounded-xl
                shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35
                transition-all duration-300 flex items-center justify-center'>
                {loading ? <Loading/> : 'Add Product'}
              </button>

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Add
