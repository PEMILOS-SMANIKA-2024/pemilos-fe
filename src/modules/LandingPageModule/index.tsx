/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@/components/ui/button'
import useToken from '@/custom-hook/useToken'
import { ArrowDown, User, Vote } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Background } from './components/background'

export default function LandingPageModule() {
  const { push } = useRouter()
  const { token, decoded } = useToken()

  return (
    <section className="w-full h-screen relative overflow-hidden flex justify-center items-center font-manrope">
      <Background />
      {token && (
        <div className="fixed top-4 right-4 z-30">
          <Button variant={'outline'} className="px-10 py-5 bg-white">
            <User />
            Hello, {decoded.name.split(' ').slice(0, 2).join(' ')}!
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
          className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[60%]"
        />
        <p className="font-manrope font-semibold w-[70%] text-center">
          Website Resmi Pemilihan Calon Ketua dan Wakil Ketua OSIS SMA Negeri 1
          Sumbawa Besar Periode 2024/2025
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
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
            <span>{token ? 'Vote' : 'Login'}</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
