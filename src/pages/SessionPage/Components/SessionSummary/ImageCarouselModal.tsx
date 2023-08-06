import { Image, Modal } from '@mantine/core'
import type { Embla } from '@mantine/carousel'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import { useState } from 'react'

const ImageCarousel = ({ images, setEmbla }) => {
  return (
    <Carousel getEmblaApi={setEmbla} slideSize="80%" slideGap="50px" controlsOffset="xs" loop withIndicators>
      {images.map((item, index) => (
        <Carousel.Slide key={index}>
          <Image
            src= {item}
            alt="Bill image"
          /></Carousel.Slide>))}
    </Carousel>
  )
}

export default function ImageCarouselModal({ images, opened, close }) {
  const TRANSITION_DURATION = 200
  const [embla, setEmbla] = useState<Embla | null>(null)
  useAnimationOffsetEffect(embla, TRANSITION_DURATION)
  return (
    <Modal
      opened={opened}
      onClose={close}
      padding={10}
      transitionProps={{ duration: TRANSITION_DURATION }}
      withCloseButton={false}
      centered>
      <ImageCarousel setEmbla={setEmbla} images={images}></ImageCarousel>
    </Modal>
  )
}
