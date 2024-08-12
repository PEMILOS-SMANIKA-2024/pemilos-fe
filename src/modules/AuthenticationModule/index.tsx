/* eslint-disable react/react-in-jsx-scope */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { checkExpired, fetchWithToken } from '@/custom-hook/custom-fetch'
import useToken from '@/custom-hook/useToken'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Background } from '../../components/ui/background'

export function AuthPageModule() {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { token, expirationDate } = useToken()
  const { push, replace } = useRouter()
  const pathname = usePathname()

  interface result {
    token: string
    name: string
  }

  async function login() {
    setLoading(true)
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

    // Check Expiration
    const isTokenExpired = checkExpired(expirationDate)

    if (token && !isTokenExpired) {
      toast({
        title: 'Login',
        description: 'Kamu sudah Login!',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    try {
      const fetchData = await fetchWithToken<result>('/auth/login', token, {
        method: 'POST',
        body: JSON.stringify({
          username: nisn.trim(),
          password: password.trim(),
        }),
      })

      if (fetchData.message) {
        toast({
          title: 'Login Gagal',
          description: fetchData.message,
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      if (fetchData.error) {
        toast({
          title: 'Login',
          description: fetchData.message,
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      // Store JWT to local storage
      if (fetchData.result) {
        localStorage.setItem('token', fetchData.result.token)
      }

      toast({
        title: 'Login',
        description: `Login sukses, Halo! ${fetchData.result?.name}`,
        variant: 'default',
      })

      setLoading(false)

      const url = window.location.href.replace(pathname, '')
      setTimeout(() => {
        push(url)
      })
    } catch (error) {
      toast({
        title: 'Login',
        description: error as string,
        variant: 'destructive',
      })
      push('')
    }
  }

  useEffect(() => {
    const isExpired = checkExpired(expirationDate)

    if (token && !isExpired) {
      setTimeout(() => {
        toast({
          title: 'Login',
          description: 'Kamu sudah Login!',
          variant: 'destructive',
        })
        replace('/')
      }, 200)
    }
  })

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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
            />
            <Button
              disabled={loading}
              onClick={async () => {
                await login()
                setTimeout(() => {
                  setLoading(false)
                }, 200)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
              size={'lg'}
              className="w-full"
              isAnimated
            >
              <LogIn className="w-4" />
              <span>Login</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
