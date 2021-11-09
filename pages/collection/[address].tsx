import React from 'react'
import type { NextPage } from 'next'

import { GridImage } from 'components'

import s from '../collection.module.scss'


const TEST_GIFS = [
  'https://media.giphy.com/media/l0O7NvDd6lifNaNuo/giphy.gif',
  'https://media.giphy.com/media/J3GvwYLogUVgY/giphy.gif',
  'https://media.giphy.com/media/PkKzNQjwPy7GvxZbfe/giphy.gif',
]

const CollectionPage: NextPage = () => {

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.stopPropagation()
  }

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <button className={s.button} type="submit">
          <svg className={s.arrow} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2685 4.20949C14.97 3.92233 14.4952 3.93153 14.208 4.23005C13.9209 4.52857 13.9301 5.00335 14.2286 5.29051L22.5028 13.25H3.75C3.33579 13.25 3 13.5858 3 14C3 14.4142 3.33579 14.75 3.75 14.75H22.5018L14.2286 22.7085C13.9301 22.9957 13.9209 23.4705 14.208 23.769C14.4952 24.0675 14.97 24.0767 15.2685 23.7896L24.6965 14.7202C25.1054 14.3268 25.1054 13.6723 24.6965 13.2788L15.2685 4.20949Z" fill="currentColor" />
          </svg>
        </button>
        <input className={s.input} type="text" />
        <div className={s.line} />
      </form>
      <div className={s.gifs}>
        {
          TEST_GIFS.map((url) => (
            <div key={url} className={s.gif}>
              <GridImage src={url} />
            </div>
          ))
        }
      </div>
    </>
  )
}


export default CollectionPage
