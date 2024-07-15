/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { fetchWithoutToken, fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { DoorClosed, Vote } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Background } from '../LandingPageModule/components/background'
import { VoteConfirmationDialog } from './components/vote-confirmation'
import { useState } from 'react'

export default function VotePageModule() {
  const { token, decoded } = useToken()
  const { push } = useRouter()

  const [alreadyVoted, setAlreadyVoted] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  async function voteCalon(calonId: number) {
    if (alreadyVoted) {
      toast({
        title: 'Vote',
        description: 'Tadi udah vote yak, jangan nyepam 😅   ~ Admin',
        variant: 'destructive',
      })
    } else {
      const response = await fetchWithToken(
        `/vote/${calonId}/${decoded.id}`,
        token,
        {
          method: 'POST',
        }
      )

      if (response.message === 'User already voted') {
        toast({
          title: 'Vote',
          description: 'Eits, vote sekali doang yak',
          variant: 'destructive',
        })
        localStorage.setItem('alreadyVoted', 'true')
      } else if (response.message === 'Calon not found') {
        toast({
          title: 'Vote',
          description: 'Calon tidak ditemukan!',
          variant: 'destructive',
        })
      } else if (response.message === 'User not found') {
        toast({
          title: 'Vote',
          description: 'User tidak ditemukan!',
          variant: 'destructive',
        })
      } else if (response.result) {
        toast({
          title: 'Vote',
          description: 'Berhasil vote!',
          variant: 'default',
        })
      } else {
        toast({
          title: 'Vote',
          description: 'Gagal vote!',
          variant: 'destructive',
        })
      }
    }

    setAlreadyVoted(true)
    setOpenDialog(false)
  }

  async function logout() {
    const response = await fetchWithoutToken(`/auth/logout/${decoded.id}`, {
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
    <section className="w-full h-full overflow-hidden flex flex-col relative font-manrope">
      <Background />
      <div className="w-full p-10 md:p-20 z-20 flex flex-col gap-2">
        <Button variant={'outline'} className="w-[180px]" onClick={logout}>
          <DoorClosed />
          <span>Logout</span>
        </Button>
        <h1 className="font-bold font-manrope text-3xl">
          Pilih Masa Depan Smanika
        </h1>
        <div className="flex flex-col lg:flex-row  gap-10 justify-between w-full font-manrope">
          {[1, 2, 3].map((item) => {
            return (
              <div
                key={item}
                className="bg-white w-full lg:w-96 rounded-lg shadow-lg p-10 flex flex-col gap-4 border-2 border-black"
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
                <VoteConfirmationDialog
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  onSubmit={() => voteCalon(item)}
                >
                  <Button className="w-full">
                    <Vote />
                    <span>Vote</span>
                  </Button>
                </VoteConfirmationDialog>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
