import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

const Collections = () => {
  let [showFilter, setShowFilter] = useState(false)
  let {products, search, showSearch} = useContext(shopDataContext)
  let [filterProduct, setFilterProduct] = useState([])
  let [category, setCaterory] = useState([])
  let [subCategory, setSubCaterory] = useState([])
  let [sortType, SetSortType] = useState("relavent")

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCaterory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCaterory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCaterory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCaterory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice()
    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  const sortProducts = () => {
    let fbCopy = filterProduct.slice()
    switch(sortType){
      case 'low-high':
        setFilterProduct(fbCopy.sort((a,b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProduct(fbCopy.sort((a,b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => { sortProducts() }, [sortType])
  useEffect(() => { setFilterProduct(products) }, [products])
  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch])

  const FilterSection = ({ title, items, onChange, selected }) => (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-4 mt-4 ${showFilter ? '' : 'hidden'} md:block`}>
      <p className='text-[11px] font-semibold text-white/40 tracking-[0.18em] uppercase mb-3'>{title}</p>
      <div className='flex flex-col gap-2.5'>
        {items.map(item => {
          const checked = selected.includes(item)
          return (
            <label key={item} className='flex items-center gap-3 cursor-pointer group'>
              {/* hidden real checkbox keeps logic intact */}
              <input
                type='checkbox'
                value={item}
                onChange={onChange}
                checked={checked}
                className='sr-only'
              />
              {/* custom visual checkbox */}
              <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0
                border transition-all duration-200
                ${ checked
                  ? 'bg-orange-500 border-orange-500'
                  : 'bg-white/[0.06] border-white/20 group-hover:border-orange-400/50'
                }`}>
                {checked && (
                  <svg className='w-2.5 h-2.5 text-white' viewBox='0 0 10 8' fill='none'>
                    <path d='M1 4l3 3 5-6' stroke='currentColor' strokeWidth='1.8'
                      strokeLinecap='round' strokeLinejoin='round'/>
                  </svg>
                )}
              </div>
              <span className={`text-[13px] transition-colors duration-150
                ${ checked ? 'text-white font-medium' : 'text-white/55 group-hover:text-white/85' }`}>
                {item}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className='w-full min-h-[100vh] bg-[#0a0a0a] pb-24 md:pb-10'>

      {/* Sidebar */}
      <div className='md:w-[220px] w-full md:min-h-[100vh] p-5 pt-20
      border-r border-white/[0.06] md:fixed top-0 left-0 bg-[#0a0a0a] z-10'>

        <button className='text-[18px] font-bold text-white flex items-center gap-2 mb-2'
          onClick={() => setShowFilter(prev => !prev)}>
          FILTERS
          {!showFilter ? <FaChevronRight className='text-[14px] text-white/50 md:hidden'/> : <FaChevronDown className='text-[14px] text-white/50 md:hidden'/>}
        </button>

        <FilterSection title="Categories" items={['Men','Women','Kids']} onChange={toggleCategory} selected={category}/>
        <FilterSection title="Sub-Categories" items={['TopWear','BottomWear','WinterWear']} onChange={toggleSubCategory} selected={subCategory}/>
      </div>

      {/* Products */}
      <div className='md:pl-[220px] w-full pt-[68px]'>
        <div className='w-full max-w-[1200px] mx-auto px-6 lg:px-8'>
          <div className='flex items-center justify-between flex-col sm:flex-row py-6 gap-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          <select
            className='bg-white/10 border border-white/20 text-white text-[14px] rounded-full
            px-5 h-[42px] outline-none focus:border-orange-400 transition-colors duration-200 cursor-pointer'
            onChange={(e) => SetSortType(e.target.value)}>
            <option value="relavent" className='bg-[#1a1a1a]'>Sort By: Relevant</option>
            <option value="low-high" className='bg-[#1a1a1a]'>Sort By: Low to High</option>
            <option value="high-low" className='bg-[#1a1a1a]'>Sort By: High to Low</option>
          </select>
        </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pb-10'>
            {filterProduct.map((item, index) => (
              <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Collections
