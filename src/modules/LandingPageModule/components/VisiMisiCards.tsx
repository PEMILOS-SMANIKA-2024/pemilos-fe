/* eslint-disable no-empty-pattern */
/* eslint-disable react/react-in-jsx-scope */

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface FAQCardProps {}

export const VisiMisiCards: React.FC<FAQCardProps> = ({}) => {
  const [currentPaslon, setCurrentPaslon] = useState<number | null>(1)

  return (
    <section className="flex gap-8 h-fit flex-grow flex-shrink-0">
      {[1, 2, 3].map((item) => {
        return (
          <div
            onClick={() => {
              console.log(currentPaslon)

              if (item === currentPaslon) {
                setCurrentPaslon(null)
              } else if (item !== currentPaslon) {
                setCurrentPaslon(item)
              }
            }}
            key={item}
            className={`${item === currentPaslon ? 'flex-grow-0' : 'grow w-0'}   bg-white rounded-xl ${item !== currentPaslon ? 'p-0 w-10' : 'p-12'} gap-5 shadow-md flex flex-col h-[520px] duration-500 transition-all ease-in-out relative overflow-hidden`}
          >
            <div
              className={`absolute w-full h-full top-0 left-0 bg-purple-primary z-20 flex items-center justify-center ${item === currentPaslon ? 'hidden' : ''}`}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center font-bold text-3xl">
                <p>{item}</p>
              </div>
            </div>
            <div
              className={`w-full h-full bg-purple-tertiary relative ${item === currentPaslon ? '' : 'hidden'}`}
            >
              <div className="absolute text-white rounded-full font-bold w-10 h-10 bg-purple-primary flex items-center justify-center top-5 left-5">
                {item}
              </div>
            </div>
            <div
              className={`h-full flex flex-col gap-1 ${item === currentPaslon ? '' : 'hidden'}`}
            >
              <h3 className="font-bold text-2xl text-black-primary">
                Andrew & Aryo
              </h3>
              <p className="font-medium text-black-secondary">
                Calon Ketua dan Wakil Ketua OSIS SMANIKA Nomor Urut 1
              </p>
              <div
                onClick={() => {
                  console.log(currentPaslon)

                  if (item === currentPaslon) {
                    setCurrentPaslon(null)
                  } else if (item !== currentPaslon) {
                    setCurrentPaslon(item)
                  }
                }}
                className="flex w-full justify-center gap-2 font-bold cursor-pointer"
              >
                <span>Visi Misi</span>
                <ArrowRight className="w-4" />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
