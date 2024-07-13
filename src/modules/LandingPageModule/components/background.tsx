import Image from 'next/image'

/* eslint-disable react/react-in-jsx-scope */
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
