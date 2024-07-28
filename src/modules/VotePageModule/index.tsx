/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { checkExpired, fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { DoorClosed, Vote } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Background } from '../LandingPageModule/components/background'
import { VoteConfirmationDialog } from './components/vote-confirmation'
import { Navbar } from '@/components/ui/navbar'

export default function VotePageModule() {
  const { token, decoded, expirationDate } = useToken()
  const { push, replace } = useRouter()

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!token) {
  //       toast({
  //         title: 'Login',
  //         description: 'Silahkan login terlebih dahulu',
  //         variant: 'destructive',
  //       })
  //       replace('/login')
  //     }
  //   }, 200)

  //   return () => clearTimeout(timer)
  // }, [token, replace])

  const [alreadyVoted, setAlreadyVoted] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  async function voteCalon(calonId: number) {
    const tokenExpired = checkExpired(expirationDate)

    if (tokenExpired) {
      toast({
        title: 'Sesi anda sudah expired!',
        description: 'Mengarahkan ke halaman login ...',
        variant: 'destructive',
      })

      const response = async () => {
        await fetchWithToken(`/auth/logout/${decoded.id}`, token, {
          method: 'POST',
        })

        localStorage.removeItem('token')
      }
      response()

      setTimeout(() => {
        replace('/login')
      }, 500)

      return
    }

    if (alreadyVoted) {
      toast({
        title: 'Vote',
        description: 'Eits, vote sekali doang yak',
        variant: 'destructive',
      })
    } else {
      const response = await fetchWithToken(
        `/vote/${calonId}/${decoded.id}`,
        token,
        {
          method: 'POST',
          body: JSON.stringify({
            sessionToken: token,
          }),
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
    toast({
      title: 'Logout',
      description: 'Sedang logout ...',
      variant: 'default',
    })

    const response = await fetchWithToken(`/auth/logout/${decoded.id}`, token, {
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
    <section className="w-full min-h-screen overflow-hidden flex flex-col relative font-manrope">
      <Navbar />
      <div className="w-full p-10 md:p-20 z-20 flex flex-col gap-2">
        {/* <Button
          variant={'outline'}
          className="w-[180px] hover:scale-105"
          onClick={logout}
        >
          <DoorClosed />
          <span>Logout</span>
        </Button> */}
        <h1 className="font-extrabold font-manrope text-black-primary text-3xl md:text-6xl mt-32 text-center leading-normal">
          Pilih sesuai <br /> <b className='text-purple-primary'>Hati Nuranimu</b>, Yak!
        </h1>
        <h3 className='text-black-secondary text-xl md:text-3xl font-bold text-center my-10'>Klik kandidat yang ingin dipilih</h3>
        <div className="flex flex-col lg:flex-row gap-5 justify-between w-full font-manrope">
          {
            // token &&
            [1, 2, 3].map((item) => {
              return (
                <div
                  key={item}
                  className="bg-white w-96 h-[504px] md:h-[764px] rounded-lg shadow-lg p-10 flex flex-col gap-4 border-2 hover:scale-[1.02] md:hover:-translate-y-5 duration-300 cursor-pointer"
                >
                  <div className="w-full flex justify-center relative">
                    <Image
                      src={'/osis-1.png'}
                      alt="SMANIKA OSIS Logo"
                      width={250}
                      height={525}
                      className='md:h-[525px] object-none'
                    />
                    <div className='absolute w-14 h-14 rounded-full bg-purple-primary text-white font-bold flex items-center justify-center text-2xl left-2 top-2'>{item}</div>
                  </div>
                  <h1 className="text-3xl font-bold text-center text-black-primary">Andrew & Aryo</h1>
                  <p className="text-md text-center text-black-secondary">
                    Calon Ketua dan Wakil Ketua OSIS SMANIKA Nomor Urut {item}
                  </p>
                  <VoteConfirmationDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onSubmit={async () => {
                      await voteCalon(item)
                    }}
                  >
                    {/* <Button
                      disabled={decoded.hasVoted}
                      className="w-full"
                      isAnimated
                    >
                      <Vote />
                      <span>Vote</span>
                    </Button> */}
                  </VoteConfirmationDialog>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
