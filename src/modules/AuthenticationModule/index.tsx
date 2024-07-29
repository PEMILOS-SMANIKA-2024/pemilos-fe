/* eslint-disable react/react-in-jsx-scope */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { motion } from 'framer-motion'
import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Background } from '../../components/ui/background'

export function AuthPageModule() {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')

  const { token } = useToken()
  const { push } = useRouter()
  const pathname = usePathname()

  async function login() {
    if (!nisn || !password) {
      toast({
        title: 'Login',
        description: 'Username dan Password tidak boleh kosong',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Login ...',
      description: 'Berusaha login',
      variant: 'default',
    })

    if (token) {
      toast({
        title: 'Login',
        description: 'Kamu sudah Login!',
        variant: 'destructive',
      })
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

      if (fetchData.message === 'Incorrect password') {
        toast({
          title: 'Login',
          description: 'Password salah!',
          variant: 'destructive',
        })
        return
      }

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
        return
      }

      // Store JWT to local storage
      localStorage.setItem('token', fetchData.result.token)

      toast({
        title: 'Login',
        description: `Login sukses, Halo! ${fetchData.result.name}`,
        variant: 'default',
      })

      const url = window.location.href.replace(pathname, '')
      setTimeout(() => {
        push(url)
      })
    } catch (error) {
      toast({
        title: 'Login',
        description: 'Login Gagal',
        variant: 'destructive',
      })
      push('')
    }
  }

  return (
    <section className="font-manrope w-full h-screen relative overflow-hidden flex items-center justify-center">
      <Background />
      <div className="flex flex-col gap-2 items-center z-20">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image
            src={'/logo-smanika-osis.png'}
            alt="SMANIKA OSIS Logo"
            width={100}
            height={200}
            className=""
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="p-8 md:p-12 border-2 border-black/10 w-[300px] md:w-[400px] rounded-xl bg-white shadow-sm"
        >
          <div className="flex flex-col gap-8">
            <label className="font-bold text-3xl text-center">Login</label>
            <Input
              placeholder="Username"
              className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                setNisn(e.target.value)
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD] focus:outline-none "
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              onClick={async () => {
                await login()
              }}
              size={'lg'}
              className="w-full"
              isAnimated
            >
              <DoorOpen className="w-4" />
              <span>Login</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
