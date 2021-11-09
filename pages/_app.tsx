import React from 'react'
import type { AppProps } from 'next/app'
import { WalletProvider } from 'wallet'
import cx from 'classnames'

import '../styles/globals.css'
import s from './app.module.scss'


const SafeHydrate: React.FunctionComponent = ({ children }) => (
  <div id="hydrateWrapper" suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SafeHydrate>
    <WalletProvider>
      <div className={s.root}>
        <div className={cx(s.headline, 'width-container')}>
          <div className={s.title}>GIF.<span>VERSE</span></div>
          <div className={s.text}>Make your own GIFs collection</div>
        </div>
        <div className={cx(s.content, 'width-container')}>
          <Component {...pageProps} />
        </div>
        <div className={s.footer}>
          <div className={s.builtOn}>
            <img src="/images/twitter.svg" alt="Twitter Logo" />
            <a href="https://twitter.com/_buildspace" target="_blank" rel="noreferrer">built on @_buildspace</a>
          </div>
        </div>
      </div>
      <div className={s.stars}>
        <div className={s.stars1} />
        <div className={s.stars2} />
        <div className={s.stars3} />
      </div>
    </WalletProvider>
  </SafeHydrate>
)


export default MyApp
