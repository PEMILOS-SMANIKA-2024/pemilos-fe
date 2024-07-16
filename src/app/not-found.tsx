/* eslint-disable react/react-in-jsx-scope */
export default function NotFound() {
  return (
    <section className="h-screen relative flex items-center justify-center font-manrope">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold">404</h1>
        <h2 className="text-2xl font-semibold">
          Beliau satu ini tampaknya tersesat
        </h2>
        <a
          href="/"
          className="hover:scale-105 duration-150 hover:font-bold hover:text-[#6149D4]"
        >
          Klik ini untuk kembali ke page utama
        </a>
      </div>
    </section>
  )
}
