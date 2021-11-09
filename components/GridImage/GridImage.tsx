import React, { useEffect } from 'react'
import { useReducerState } from 'hooks'
import cx from 'classnames'

import AspectContainer from '../AspectContainer/AspectContainer'

import s from './GridImage.module.scss'


const getSvgPlaceholder = (width = 1, height = 1) => `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3e%3c/svg%3e`

type GridImageProps = {
  className?: string
  src: string
}

const GridImage: React.FC<GridImageProps> = ({ className, src: gifSrc }) => {
  const [ { src, aspect }, setState ] = useReducerState({ src: getSvgPlaceholder(), aspect: 1 })

  useEffect(() => {
    if (!gifSrc) {
      return
    }

    const img = new Image()

    img.onload = () => {
      setState({
        aspect: img.width / img.height,
        src: gifSrc,
      })
    }

    img.src = gifSrc
  }, [ gifSrc ])

  return (
    <AspectContainer className={cx(s.image, className)} aspect={aspect} fit="cover">
      <img src={src} alt="" />
    </AspectContainer>
  )
}


export default GridImage
