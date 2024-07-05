import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'

export const Test = () => {
  const { replace } = useRouter()

  useEffect(() => {
    console.log('HELLO')
    replace('/dfbhsfhj')
  })

  return <div></div>
}
