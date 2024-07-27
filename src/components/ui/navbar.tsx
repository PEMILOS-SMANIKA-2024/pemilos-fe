import React from 'react'
import { Button } from './button'

export const Navbar = () => {
  return (
    <nav className='container bg-white lg:w-[1285px] w-[398px] h-20 border shadow-sm fixed rounded-xl flex items-center z-30 top-5 lg:top-12 justify-between font-manrope'>
      <div className='font-semibold flex gap-10 items-center'>
        <img 
          src={"logo-smanika-osis.png"} 
          alt="SMANIKA OSIS Logo" 
          className='w-20 h-14'
          />
        <a href="" className='hover:text-[#6149D4] hidden lg:flex'>Home</a>
        <a href="" className='hover:text-[#6149D4] hidden'>Vote</a>
        <a href="" className='hover:text-[#6149D4] hidden lg:flex'>Visi Misi</a>
        <a href="" className='hover:text-[#6149D4] hidden lg:flex'>Tata Cara</a>
        <a href="" className='hover:text-[#6149D4] hidden lg:flex'>FAQ</a>
      </div>
      <div>
        <Button variant={'default'} className='hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex'>Login</Button>
      </div>
      <div className='w-[24px] h-[24px] flex gap-2 flex-col cursor-pointer lg:hidden'>
        <div className='w-full h-1 bg-black'></div>
        <div className='w-full h-1 bg-black'></div>
        <div className='w-full h-1 bg-black'></div>
      </div>
    </nav>
  )
}
