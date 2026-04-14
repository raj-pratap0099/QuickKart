import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from "react-icons/ri"

const Lists = () => {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
      else console.log("Failed to remove Product")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className='w-full min-h-[100vh] bg-[#080808] text-white'>
      <Nav/>
      <div className='flex'>
        <Sidebar/>

        <main className='flex-1 ml-[60px] md:ml-[200px] pt-[64px] min-h-[100vh]'>
          <div className='w-full max-w-[900px] mx-auto px-6 md:px-10 py-10'>

            <div className='mb-8'>
              <h1 className='text-[20px] font-bold text-white tracking-tight'>Product List</h1>
              <p className='text-[12px] text-white/30 mt-0.5'>{list.length} products listed</p>
            </div>

            {list?.length > 0 ? (
              <div className='flex flex-col gap-3'>
                {list.map((item, index) => (
                  <div key={index}
                    className='w-full flex items-center gap-4 p-4
                    bg-white/[0.03] border border-white/[0.07] rounded-2xl
                    hover:bg-white/[0.055] hover:border-white/[0.13] hover:scale-[1.005]
                    transition-all duration-200 ease-out group'>

                    {/* Image */}
                    <img src={item.image1} alt={item.name}
                      className='w-16 h-16 rounded-xl object-cover flex-shrink-0
                      border border-white/[0.08] shadow-md'/>

                    {/* Info */}
                    <div className='flex-1 flex flex-col gap-0.5 min-w-0'>
                      <p className='text-[14px] font-semibold text-white/85 truncate'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-0.5'>
                        <span className='text-[11px] text-white/35 px-2 py-0.5
                        bg-white/[0.05] border border-white/[0.08] rounded-full'>
                          {item.category}
                        </span>
                        <span className='text-[13px] font-semibold text-orange-400'>
                          ₹ {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button onClick={() => removeList(item._id)}
                      className='flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                      text-white/25 border border-white/[0.07] bg-white/[0.03]
                      hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10
                      transition-all duration-200'>
                      <RiDeleteBin6Line className='w-4 h-4'/>
                    </button>

                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-20 gap-3'>
                <p className='text-white/25 text-[14px]'>No products listed yet.</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

export default Lists
