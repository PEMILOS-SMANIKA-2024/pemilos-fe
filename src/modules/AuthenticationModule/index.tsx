'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { API_URL } from '@/modules/constant'
import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Background } from '../LandingPageModule'

export function AuthPageModule() {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')

  const { push } = useRouter()
  // const token = localStorage.getItem('token')

  async function login() {
    const token = localStorage.getItem('token')
    if (token) {
      toast({
        title: 'Login',
        description: 'You are already logged in',
        variant: 'destructive',
      })
      return
    }

    const url = `${API_URL}/auth/login`
    try {
      const fetchData = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: nisn,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const response = await fetchData.json()

      console.log(response)

      if (!response.result) {
        console.log(response)
      }

      // Store JWT to local storage
      localStorage.setItem('token', response.result.token)

      toast({
        title: 'Login',
        description: `Login success, Welcome ${response.result.username}`,
        variant: 'default',
      })

      push('')

      return response
    } catch (error) {
      toast({
        title: 'Login',
        description: 'Login failed',
        variant: 'destructive',
      })
      push('')
    }
  }

  return (
    <section className="font-manrope w-full h-screen relative overflow-hidden flex items-center justify-center">
      <Background />
      <Image
        src={'/osis-1.png'}
        alt="SMANIKA OSIS Logo"
        width={400}
        height={200}
        className="w-32 md:w-80 lg:w-96 bottom-0 absolute left-0 hover:scale-[105%] z-30 duration-300"
      />
      <Image
        src={'/osis-2.png'}
        alt="SMANIKA OSIS Logo"
        width={400}
        height={200}
        className="w-32 md:w-80 lg:w-96 bottom-0 absolute right-0 hover:scale-[105%] z-30 duration-300"
      />
      <div className="flex flex-col gap-2 items-center z-20">
        <Image
          src={'/logo-smanika-osis.png'}
          alt="SMANIKA OSIS Logo"
          width={100}
          height={200}
          className=""
        />
        <div className="p-8 border-[1px] border-black w-[300px] rounded-xl bg-white shadow-sm">
          <div className="flex flex-col gap-7">
            <label className="font-extrabold text-2xl">Login</label>
            <Input
              placeholder="Username"
              className="font-manrope font-semibold text-sm p-5 bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                setNisn(e.target.value)
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              className="font-manrope font-semibold text-sm p-5 bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              onClick={() => {
                login()
              }}
              size={'lg'}
              className="text-xs font-bold"
            >
              <DoorOpen className="w-4" />
              <span>Login</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
