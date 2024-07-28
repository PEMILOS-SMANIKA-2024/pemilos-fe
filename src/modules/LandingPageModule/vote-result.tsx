import Image from 'next/image'

/* eslint-disable react/react-in-jsx-scope */
interface VoteItemProps {
  paslonName: string
  paslonImage: string
  voteCount: number
}

export const voteItem: VoteItemProps[] = [
  {
    paslonName: 'Andrew & Aryo',
    paslonImage: '404-1.png',
    voteCount: 222,
  },
  {
    paslonName: 'Dode & Reksa',
    paslonImage: '404-1.png',
    voteCount: 321,
  },
  {
    paslonName: 'Ganjar & Mahfud',
    paslonImage: '404-1.png',
    voteCount: 60,
  },
]

export const VoteResultModule = () => {
  const totalVotes = voteItem.reduce((acc, item) => acc + item.voteCount, 0)
  const maxHeight = 350
  return (
    <section className="mt-10 font-manrope flex flex-col gap-10">
      <h1 className="font-extrabold text-center text-3xl md:text-5xl mt-5">
        Hasil Sementara <br />
        Pemilos <b className="text-purple-primary">SMANIKA</b> 2024
      </h1>
      <div className="flex items-end  justify-center gap-3 md:gap-10">
        {voteItem.map((item, index) => {
          const percentage = (item.voteCount / totalVotes) * 100
          const barHeight = Math.round((percentage / 100) * maxHeight)

          return (
            <div className="flex flex-col items-center gap-2" key={index}>
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
                {item.voteCount} Votes
              </h2>
              <Image
                src={`/${item.paslonImage}`}
                alt="paslon"
                height={166}
                width={166}
                className="hover:scale-105 duration-200 hover:shadow-md transition-all w-16 aspect-square md:w-40 bg-white rounded-full border shadow-sm"
              />
              <h3 className="font-bold text-sm md:text-base text-center">
                {item.paslonName}
              </h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}
