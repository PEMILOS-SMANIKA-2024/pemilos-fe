import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

/* eslint-disable react/react-in-jsx-scope */
export const VisiMisiSection = () => {
  return (
    <section className="font-manrope px-10 flex flex-col gap-10 my-10">
      <h1 className="font-extrabold text-5xl">Yuk, cek Visi Misi!</h1>
      <div className="flex flex-col lg:flex-row justify-around gap-5">
        {[1, 2, 3].map((item) => {
          return (
            <div
              key={item}
              className="bg-white border-2 border-black rounded-md  p-10 flex flex-col items-center gap-5 duration-300 hover:shadow-lg hover:scale-[102%] delay-100 cursor-pointer"
            >
              <div className="flex relative w-full h-52 hover:opacity-80 duration-300">
                <Image
                  src={'/osis-2.png'}
                  alt="OSIS Logo"
                  width={300}
                  height={300}
                  className="w-40 absolute bottom-0 right-0 z-20"
                />
                <Image
                  src={'/osis-1.png'}
                  alt="OSIS Logo"
                  width={300}
                  height={300}
                  className="w-40 absolute bottom-0"
                />
              </div>
              <div className="">
                <h1 className="font-bold text-xl">Andrew & Aryo</h1>
                <p className="font-medium text-[#5F5F5F]">
                  Calon Ketua dan Wakil Ketua OSIS Nomor Urut {item}
                </p>
                <div className="mt-4 flex gap-2 hover:gap-5 duration-300">
                  <span className="font-bold text-sm hover:text-[#6149D4] duration-200">
                    Cek Visi Misi
                  </span>
                  <ArrowRight className="w-4" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
