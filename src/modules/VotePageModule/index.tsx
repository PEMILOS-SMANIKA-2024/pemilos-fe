/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Button } from '@/components/ui/button'
import { fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { DoorClosed, Vote } from 'lucide-react'
import Image from 'next/image'
import { Background } from '../LandingPageModule/components/background'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function VotePageModule() {
  const { token } = useToken()
  const { push } = useRouter()

  async function logOut() {
    const response = await fetchWithToken('/auth/logout', token, {
      method: 'POST',
    })

    if (response.result) {
      localStorage.removeItem('token')
      toast({
        title: 'Logout',
        description: 'Berhasil logout',
        variant: 'default',
      })

      setTimeout(() => {
        push('/login')
      })
    }
  }

  return (
    <section className="w-full h-screen overflow-hidden flex flex-col relative font-manrope">
      <Background />
      <div className="w-full p-20 z-20 flex flex-col gap-2">
        <Button variant={'outline'} className="w-[180px]" onClick={logOut}>
          <DoorClosed />
          <span>Logout</span>
        </Button>
        <h1 className="font-bold font-manrope text-3xl">
          Pilih Masa Depan Smanika
        </h1>
        <div className="flex justify-between w-full h-full font-manrope">
          {[1, 2, 3].map((item) => {
            return (
              <div
                key={item}
                className="bg-white w-96 rounded-lg shadow-lg p-10 flex flex-col gap-4 border-2 border-black"
              >
                <div className="w-full flex justify-center">
                  <Image
                    src={'/osis-1.png'}
                    alt="SMANIKA OSIS Logo"
                    width={250}
                    height={200}
                    className="hover:scale-[105%] duration-300"
                  />
                </div>
                <h1 className="text-2xl font-bold">Kandidat {item}</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque, quos.
                </p>
                <Button className="w-full">
                  <Vote />
                  <span>Vote</span>
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
