import React from 'react'
import type { NextPage } from 'next'

import { GridImage } from 'components'

import s from './index.module.scss'


const TEST_GIFS = [
  'https://media.giphy.com/media/l0O7NvDd6lifNaNuo/giphy.gif',
  'https://media.giphy.com/media/J3GvwYLogUVgY/giphy.gif',
  'https://media.giphy.com/media/PkKzNQjwPy7GvxZbfe/giphy.gif',
]

const HomePage: NextPage = () => {

  return (
    <>
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


export default HomePage
