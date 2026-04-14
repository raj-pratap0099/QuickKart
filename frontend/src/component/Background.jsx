
import React from 'react'
import back1 from '../assets/back1.jpg'
import back2 from '../assets/back2.jpg'
import back3 from '../assets/back3.jpg'
import back4 from '../assets/back4.jpg'

const images = [back2, back1, back3, back4]

const Background = ({heroCount}) => {
  return (
    <img
      src={images[heroCount]}
      alt=""
      className='absolute inset-0 w-full h-full object-cover'
    />
  )
}

export default Background
