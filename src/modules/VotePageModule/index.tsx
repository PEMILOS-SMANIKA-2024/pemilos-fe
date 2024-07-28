/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Navbar } from '@/components/ui/navbar'
import { toast } from '@/components/ui/use-toast'
import { checkExpired, fetchWithToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { VoteConfirmationDialog } from './components/vote-confirmation'
import { motion } from 'framer-motion'

export default function VotePageModule() {
  const { token, decoded, expirationDate } = useToken()

  const { replace } = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!token) {
        toast({
          title: 'Login',
          description: 'Silahkan login terlebih dahulu',
          variant: 'destructive',
        })
        replace('/login')
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [token, replace])

  const [alreadyVoted, setAlreadyVoted] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  async function voteCalon(calonId: number) {
    const tokenExpired = checkExpired(expirationDate)

    toast({
      title: 'Vote',
      description: 'Sedang memproses vote ...',
      variant: 'default',
    })

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
        title: 'Vote Gagal',
        description: 'Anda sudah melakukan voting!',
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
          description: 'Anda sudah melakukan voting!',
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

      const newToken = response.result.token
      localStorage.setItem('token', newToken)
    }

    setAlreadyVoted(true)
    setOpenDialog(false)
  }

  return (
    <section
      id="vote"
      className="w-full min-h-screen overflow-hidden flex flex-col relative font-manrope"
    >
      <Navbar />
      <div className="w-full p-10 md:p-20 z-20 flex flex-col gap-2">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="font-extrabold font-manrope text-black-primary text-3xl md:text-6xl mt-32 text-center leading-normal"
        >
          Pilih sesuai <br />{' '}
          <b className="text-purple-primary">Hati Nuranimu</b>, Yak!
        </motion.h1>
        <motion.h3
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="text-black-secondary text-xl md:text-2xl font-bold text-center my-10"
        >
          {decoded.hasVoted || alreadyVoted
            ? 'Terimakasih telah melakukan voting!'
            : 'Klik kandidat yang ingin dipilih'}
        </motion.h3>
        <div className="flex flex-col items-center lg:flex-row gap-10 lg:gap-5 justify-between w-full font-manrope">
          {
            // token &&
            [1, 2, 3].map((item) => {
              return (
                <VoteConfirmationDialog
                  key={item}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  {...(decoded.hasVoted || alreadyVoted
                    ? { disable: true }
                    : {})}
                  onSubmit={async () => {
                    await voteCalon(item)
                  }}
                >
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                    whileHover={{ y: -50, transition: { duration: 0.1 } }}
                    {...(decoded.hasVoted || alreadyVoted
                      ? {
                          onClick: () => {
                            toast({
                              title: 'Vote Gagal',
                              description: 'Anda sudah melakukan voting!',
                              variant: 'destructive',
                            })
                          },
                        }
                      : {})}
                    key={item}
                    className="overflow-hidden relative bg-white w-full rounded-xl shadow-lg p-10 lg:p-12 flex flex-col gap-4 border-2 hover:scale-[1.02] md:hover:-translate-y-5 duration-300 cursor-pointer"
                  >
                    {(decoded.hasVoted || alreadyVoted) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full absolute bg-black/60 top-0 right-0 z-30"
                      />
                    )}
                    <div className="w-full flex justify-center relative">
                      <Image
                        src={'/osis-1.png'}
                        alt="SMANIKA OSIS Logo"
                        width={250}
                        height={525}
                        className="object-none"
                      />
                      <div className="absolute w-14 h-14 rounded-full bg-purple-primary text-white font-bold flex items-center justify-center text-2xl left-2 top-2">
                        {item}
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-center text-black-primary">
                      Andrew & Aryo
                    </h1>
                    <p className="text-md text-center text-black-secondary font-medium">
                      Calon Ketua dan Wakil Ketua OSIS SMANIKA Nomor Urut {item}
                    </p>
                  </motion.div>
                </VoteConfirmationDialog>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
