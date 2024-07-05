import React from 'react'
import { Button } from './button'

export const Navbar = () => {
  return (
    <div className="w-full flex bg-gray-50 px-10 py-2">
      <Button className="font-poppins" variant={'destructive'}>
        Login
      </Button>
    </div>
  )
}
