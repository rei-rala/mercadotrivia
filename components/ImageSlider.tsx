import Image from "next/image"
import React, { useMemo, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


type ArrayOfImages = { src: string, alt?: string }[]

interface IImageSliderProps {
  images: ArrayOfImages,
  altText: string
}

const ImageSlider: React.FC<IImageSliderProps> = ({ images, altText }) => {
  const imagesPreload = useMemo(() => images.map((img, index) => <Image key={`slider${index}-${img.src}`} src={img.src || 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadolibre/logo__small.png'} alt={img.alt ?? altText} width={500} height={500} objectFit="contain" />), [images, altText])
  const [currentImageIndex, setCurrentImage] = useState(0)

  const handleClick = (e: any) => {
    let newCurrent = currentImageIndex
    newCurrent = currentImageIndex + parseInt(e.target.value || '0')

    newCurrent = newCurrent < 0
      ? images.length - 1
      : newCurrent >= images.length
        ? 0
        : newCurrent

    setCurrentImage(newCurrent)
  }

  return (
    <figure>
      <button onClick={handleClick} role='check previous image' value={-1} ><ArrowBackIosNewIcon /></button>
      {imagesPreload[currentImageIndex]}
      <span>{(currentImageIndex + 1)}/{images.length}</span>
      <button onClick={handleClick} role='check next image' value={1} ><ArrowForwardIosIcon /></button>

      <style jsx>{`
        figure {
          position: relative;

          display: grid;
          place-items: center;
          width: 500px;
          
          margin: 0;
          border: 1px solid black;

          overflow: hidden;
          cursor: default;
        }

        figure, span {
          border-radius: 0.75rem;
        }

        button, span {
          position: absolute;
          color: white;
          border: none;
          background: hsla(0, 0%, 0%, 1);
          transition: opacity 200ms;
          opacity: 0.25;
          z-index: 2;
          width: 4rem;
        }

        button {
          position: absolute;
          top: 50%;
          height: 100%;
          transform: translateY(-50%);

          background: linear-gradient(0deg, hsla(0,0%,0%,0.25) 0%, hsla(0,0%,0%,1) 20%, hsla(0,0%,0%,1) 80% , hsla(0,0%,0%,0.25) 100%);
          cursor: pointer;
        }

        button:first-child {
          left: 0;
        }
        button:last-child {
          right: 0;
        }
        
        span {
          bottom: 2.5%;
          padding: 0.5rem 0;
          text-align: center;
        }
        
        :is(button, span):hover {
          opacity: 1;
        }

      `}</style>
    </figure>
  )
}


export default ImageSlider