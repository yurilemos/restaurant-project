"use client";
import { useState } from "react";

import Image from "next/image";

type ImageWithFallback = {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
};

const ImageWithFallback = ({
  alt,
  src,
  width,
  height,
  className,
}: ImageWithFallback) => {
  const [usedSrc, setUsedSrc] = useState(src);

  return (
    <Image
      alt={alt}
      onError={(e) => {
        setUsedSrc("/no-image.svg");
      }}
      src={usedSrc}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ImageWithFallback;
