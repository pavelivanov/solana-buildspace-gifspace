import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import { PREVIEW_GIFS } from 'helpers'

import { Gallery } from 'components'

import s from './index.module.scss'


const HomePage: NextPage = () => {

  return (
    <>
      <Gallery items={PREVIEW_GIFS} />
      <div className={s.buttonContainer}>
        <Link href="/collection">
          <a className={s.button}>Create my own collection</a>
        </Link>
      </div>
    </>
  )
}


export default HomePage
