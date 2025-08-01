import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value=''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mx-20 mb-8'>  {/*div for the content*/}
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mt-15 mb-4 border border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary)]/10 rounded-full text-sm text-[color:var(--color-primary)]  '>
            <p>New : AI Feature Integrated</p>
            <img src={assets.star_icon} alt="" className='w-2.5'/>
        </div>
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-[color:var(--color-primary)]'>blogging</span> <br/>platform.</h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>Welcome to Fun Reads, where you can relax your mind and enjoy daily experiences presented in a fun way! Tired after a stressful day? Recharge yourself with pleasureful reads, and even write your own! You'll always have a listening ear!</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input ref={inputRef} type='text' placeholder='Search for blogs' required className='w-full pl-4 outline-none'/>
            <button type='submit' className='bg-[color:var(--color-primary)] text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
        </form>
      </div>
      <div className='text-center'>
        {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
      </div>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}

export default Header
