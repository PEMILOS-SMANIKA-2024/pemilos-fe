import Image from 'next/image'

/* eslint-disable react/react-in-jsx-scope */
export const TataCaraModule = () => {
  return (
    <main className="font-manrope flex flex-col gap-6 md:gap-10 px-10">
      <h1 className="font-extrabold text-3xl md:text-5xl text-center">
        Gimana Tuh <br /> Tata Cara
        <b className="text-purple-primary"> Pemilihannya?</b>
      </h1>
      <div className="flex gap-10 w-full justify-center flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div
              key={item}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:rotate-6 duration-200 w-fit h-fit bg-white border-2 border-black/10 p-8 md:p-12 rounded-xl shadow-sm"
            >
              <div className="flex flex-col w-full gap-2">
                <div className="w-[200px] aspect-square relative overflow-hidden rounded-xl">
                  <Image
                    src={'/scc.jpeg'}
                    alt="SCC"
                    layout="fill"
                    objectFit="cover"
                    className="overflow-hidden"
                  />
                  <div className="w-10 aspect-square absolute bg-purple-primary top-5 left-5 rounded-full flex items-center justify-center font-bold text-white">
                    {item}
                  </div>
                </div>
                <h3 className="w-[200px] text-center font-bold text-lg">
                  Datang ke Tempat Pemilihan Suara
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
