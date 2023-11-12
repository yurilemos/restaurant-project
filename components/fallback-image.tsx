import Image from 'next/image'

type ImageWithFallback = {
  alt: string
  src: string
  width?: number
  height?: number
  className?: string
}

const ImageWithFallback = ({
  alt,
  src,
  width,
  height,
  className,
}: ImageWithFallback) => {
  console.log(src)
  return (
    <Image
      alt={alt}
      onError={(e) => {
        console.log(e)
      }}
      src={src}
      width={width}
      height={height}
      className={className}
    />
  )
}

export default ImageWithFallback
