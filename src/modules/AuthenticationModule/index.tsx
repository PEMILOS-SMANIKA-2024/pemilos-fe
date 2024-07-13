/* eslint-disable react/react-in-jsx-scope */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useToken from '@/custom-hook/useToken'
import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Background } from '../LandingPageModule/components/background'
import { fetchWithToken } from '@/custom-hook/customFetch'
import { usePathname, useRouter } from 'next/navigation'

export function AuthPageModule() {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')

  const { token } = useToken()
  const { push } = useRouter()
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    if (token) {
      toast({
        title: 'Login',
        description: 'You are already logged in',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    try {
      const fetchData = await fetchWithToken('/auth/login', token, {
        method: 'POST',
        body: JSON.stringify({
          username: nisn,
          password: password,
        }),
      })

      if (fetchData.message === 'User not found') {
        toast({
          title: 'Login',
          description: 'User tidak ditemukan!',
          variant: 'destructive',
        })
        return
      }

      if (fetchData.message === 'User already logged in another device') {
        toast({
          title: 'User sudah login di perangkat lain!',
          description: 'Silahkan hubungi admin untuk mengatasi masalah ini',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      // Set Loggedin Status to True
      await fetchWithToken('/auth/isLogged', fetchData.result.token, {
        method: 'POST',
      })

      // Store JWT to local storage
      localStorage.setItem('token', fetchData.result.token)

      toast({
        title: 'Login',
        description: `Login success, Welcome ${fetchData.result.name}`,
        variant: 'default',
      })

      setLoading(false)

      const url = window.location.href.replace(pathname, '')
      setTimeout(() => {
        push(url)
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Login',
        description: 'Login Failed',
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
              className="font-manrope font-semibold text-sm p-5 bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                setNisn(e.target.value)
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              className="font-manrope font-semibold text-sm p-5 bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              className="font-manrope font-semibold text-sm p-5 bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            {loading && (
              <div className="text-xs animate-bounce">... Loading</div>
            )}
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
