'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/modules/constant'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export function AuthPageModule() {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
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
        },
      })

      const response = await fetchData.json()

      if (!response.result) {
        throw new Error(response.message)
      }

      // Store JWT to local storage
      localStorage.setItem('token', response.result.token)

      toast({
        title: 'Login',
        description: `Login success, Welcome ${response.result.username}`,
        variant: 'default',
      })

      return response
    } catch (error) {
      toast({
        title: 'Login',
        description: 'Login failed',
        variant: 'destructive',
      })
    }
  }

  return (
    <section className="font-manrope">
      <div className="p-8 border-[1px] w-[300px] rounded-xl">
        <div className="flex flex-col gap-7">
          <label className="font-extrabold text-xl">Login</label>
          <Input
            placeholder="Username"
            className="font-manrope font-medium text-xs"
            onChange={(e) => {
              setNisn(e.target.value)
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            className="font-manrope font-medium text-xs"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              const response = login()
            }}
            className="text-xs font-bold"
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  )
}
