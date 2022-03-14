import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './imageSlider.module.scss'

type ArrayOfImages = { src: string, alt?: string }[]

interface IImageSliderProps {
  images: ArrayOfImages,
  altText: string
}

const ImageSlider: React.FC<IImageSliderProps> = ({ images, altText }) => {
  const [showIndex, setShowIndex] = useState({
    prev: images.length - 1,
    current: 0,
    next: 1
  })
  const [changedImage, setChangedImage] = useState(false)

  const getPrevIndex = (currentIndex: number) => currentIndex < 1 ? images.length - 1 : currentIndex - 1
  const getNextIndex = (currentIndex: number) => currentIndex < images.length - 1 ? currentIndex + 1 : 0

  const handleClick = (e: any) => {
    let newIndex: number = e.target.value === 'prev' ? getPrevIndex(showIndex.current) : getNextIndex(showIndex.current)

    setShowIndex({
      prev: getPrevIndex(newIndex),
      current: newIndex,
      next: getNextIndex(newIndex)
    })
  }

  // listen to arroy keys
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 37) {
        handleClick({ target: { value: 'prev' } })
      } else if (e.keyCode === 39) {
        handleClick({ target: { value: 'next' } })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    setChangedImage(true)

    let timeout = setTimeout(() => {
      setChangedImage(false)
    }, 500);

    return () => {
      clearTimeout(timeout)
    }
  }, [showIndex])

  return (
    <figure className={styles.container}>
      <button className={styles.switcher} onClick={handleClick} role='check previous image' value={'prev'} ><ArrowBackIosNewIcon /></button>
      {
        images.map((img, index) =>
          <div
            key={`slider${index}-${altText}`}
            className={showIndex.current === index ? styles.current : [showIndex.prev, showIndex.next].includes(index) ? styles.near : styles.hide}
          >
            <Image
              src={img.src || 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadolibre/logo__small.png'}
              alt={img.alt ?? altText}
              width={500}
              height={500}
              objectFit="contain"
            />
          </div>
        )
      }
      <span className={`${styles.indicator} ${!!changedImage ? styles.emphasize : ''}`}> {(showIndex.current + 1)}/{images.length} </span>
      <button className={styles.switcher} onClick={handleClick} role='check next image' value={'next'} ><ArrowForwardIosIcon /></button>
    </figure>
  )
}


export default ImageSlider