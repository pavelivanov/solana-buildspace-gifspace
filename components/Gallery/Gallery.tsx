import React from 'react'

import { GridImage } from 'components'

import s from './Gallery.module.scss'


type GalleryProps = {
  items: string[]
}

const Gallery: React.FunctionComponent<GalleryProps> = ({ items }) => {

  return (
    <div className={s.gifs}>
      {
        items.map((url) => (
          <div key={url} className={s.gif}>
            <GridImage src={url} />
          </div>
        ))
      }
    </div>
  )
}


export default Gallery
