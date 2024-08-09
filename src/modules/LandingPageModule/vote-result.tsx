'use client'
import { AnimatedSection } from '@/components/ui/animated-section'
import { AnimatedTitle } from '@/components/ui/animated-title'
import { fetchWithoutToken } from '@/custom-hook/custom-fetch'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/* eslint-disable react/react-in-jsx-scope */
interface VoteItemProps {
  paslonName: string
  paslonImage: string
  voteCount: number
}

export const voteItem: VoteItemProps[] = [
  {
    paslonName: 'Zulfikar & Embun',
    paslonImage: '404-1.png',
    voteCount: 222,
  },
  {
    paslonName: 'Arvel & Icha',
    paslonImage: '404-1.png',
    voteCount: 321,
  },
]

export interface voteResultInterface {
  paslonName: string
  calonId: number
  votes: number
}

export const VoteResultModule = () => {
  const maxHeight = 250

  const [fetchData, setFetchData] = useState<voteResultInterface[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWithoutToken<voteResultInterface[]>(
        '/vote/count/all',
        {}
      )

      setFetchData(data?.result)
    }

    fetchData()
  }, [])

  return (
    <section className="mt-10 font-manrope flex flex-col gap-10">
      <AnimatedTitle>
        Hasil Sementara <br />
        Pemilos <b className="text-purple-primary">SMANIKA</b> 2024
      </AnimatedTitle>
      <AnimatedSection className="flex items-end justify-center gap-3 md:gap-10">
        {fetchData ? (
          fetchData.map((item, index) => {
            const totalVotes = fetchData.reduce(
              (acc, item) => acc + item.votes,
              0
            )

            const percentage = (item.votes / totalVotes) * 100
            const barHeight = Math.round((percentage / 100) * maxHeight)

            return (
              <AnimatedSection
                className="flex flex-col items-center gap-2"
                key={index}
              >
                <div
                  className="w-10 md:w-12 bg-purple-primary rounded-full"
                  style={{
                    height: `${barHeight}px`,
                  }}
                ></div>
                <div className="duration-200 hover:scale-105 w-8 aspect-square md:w-12 bg-purple-primary rounded-full text-base md:text-xl font-bold text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <h2 className="duration-200 font-extrabold text-base md:text-3xl text-purple-primary">
                  {item.votes} Votes
                </h2>
                <Image
                  src={`/404-1.png`}
                  alt="paslon"
                  height={166}
                  width={166}
                  className="hover:scale-105 duration-200 hover:shadow-md transition-all w-16 aspect-square md:w-40 bg-white rounded-full border shadow-sm"
                />
                <h3 className="font-bold text-sm md:text-base text-center">
                  {item.paslonName}
                </h3>
              </AnimatedSection>
            )
          })
        ) : (
          <div className="animate-pulse font-manrope font-bold">
            Loading Data...
          </div>
        )}
      </AnimatedSection>
    </section>
  )
}
