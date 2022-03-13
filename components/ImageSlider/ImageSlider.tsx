import Image from "next/image"
import React, { useMemo, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './imageSlider.module.scss'

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
    <figure className={styles.container}>
      <button className={styles.switcher} onClick={handleClick} role='check previous image' value={-1} ><ArrowBackIosNewIcon /></button>
      {imagesPreload[currentImageIndex]}
      <span className={styles.indicator}> {(currentImageIndex + 1)}/{images.length} </span>
      <button className={styles.switcher} onClick={handleClick} role='check next image' value={1} ><ArrowForwardIosIcon /></button>
    </figure>
  )
}


export default ImageSlider