/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { ArrowDown, User, Vote } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const Background = () => {
  return (
    <div className="w-full h-full absolute z-0">
      <Image
        src={'/corner-blob-1.png'}
        alt="Corner Blob 1"
        width={500}
        height={300}
        className="absolute -bottom-12"
      />
      <Image
        src={'/corner-blob-2.png'}
        alt="Corner Blob 2"
        width={400}
        height={300}
        className="absolute -top-12 right-0"
      />
    </div>
  )
}

export default function LandingPageModule() {
  const { push, refresh } = useRouter()
  const token = localStorage.getItem('token')
  let decoded: { username: string; exp: string } = { username: '', exp: '' }

  if (token) {
    decoded = jwtDecode(token ?? '')
  }

  const expirationDate = new Date(parseInt(decoded.exp) * 1000)

  if (expirationDate < new Date()) {
    localStorage.removeItem('token')
    refresh()
  }

  return (
    <section className="w-full h-screen relative overflow-hidden flex justify-center items-center font-manrope">
      <Background />
      {token && (
        <div className="fixed top-4 right-4">
          <Button
            variant={'outline'}
            className="px-10 py-5"
            onClick={() => {
              localStorage.removeItem('token')
              push('/login')
            }}
          >
            <User />
            Hello, {decoded.username}!
          </Button>
        </div>
      )}
      <div className="gap-4 z-20 flex flex-col items-center">
        <Image
          src={'/logo-smanika-osis.png'}
          alt="SMANIKA OSIS Logo"
          width={100}
          height={200}
          className=""
        />
        <Image
          src={'/smanika-memilih.png'}
          alt="SMANIKA Memilih"
          width={500}
          height={200}
          className=""
        />
        <p className="font-manrope font-semibold w-[70%] text-center">
          Website Resmi Pemilihan Calon Ketua dan Wakil Ketua OSIS SMA Negeri 1
          Sumbawa Besar Periode 2024/2025
        </p>
        <div className="flex gap-4">
          <Button variant={'outline'}>
            <ArrowDown className="w-5" />
            <span>Lihat Calon</span>
          </Button>
          <Button
            onClick={() => {
              const token = localStorage.getItem('token')

              if (token) {
                push('/vote')
                return
              }

              push('/login')
            }}
          >
            <Vote className="w-5" />
            <span>Vote</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
