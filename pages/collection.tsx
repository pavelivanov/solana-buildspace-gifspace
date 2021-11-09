import React, { useState } from 'react'
import type { NextPage } from 'next'
import { web3 } from '@project-serum/anchor'
import { useConnect } from 'wallet'
import { PREVIEW_GIFS, baseAccount, getProvider, getProgram } from 'helpers'
import cx from 'classnames'

import { Gallery } from 'components'

import useCollectionPage from './useCollectionPage'

import s from './collection.module.scss'


const phantomWalletExtensionLink = 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en'

type FormProps = {
  onSubmit: () => void
}

const Form: React.FunctionComponent<FormProps> = ({ onSubmit }) => {
  const [ isSubmitting, setSubmitting ] = useState(false)

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    try {
      setSubmitting(true)
      await onSubmit()
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input id="gifInput" className={s.input} type="text" placeholder="Enter gif link!" />
      <div className={s.line} />
      <button className={s.submitButton} type="submit">
        {
          isSubmitting ? (
            <img src="/images/spinner.svg" alt="" />
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2685 4.20949C14.97 3.92233 14.4952 3.93153 14.208 4.23005C13.9209 4.52857 13.9301 5.00335 14.2286 5.29051L22.5028 13.25H3.75C3.33579 13.25 3 13.5858 3 14C3 14.4142 3.33579 14.75 3.75 14.75H22.5018L14.2286 22.7085C13.9301 22.9957 13.9209 23.4705 14.208 23.769C14.4952 24.0675 14.97 24.0767 15.2685 23.7896L24.6965 14.7202C25.1054 14.3268 25.1054 13.6723 24.6965 13.2788L15.2685 4.20949Z" fill="currentColor" />
            </svg>
          )
        }
      </button>
    </form>
  )
}

type InitializeProgramProps = {
  onSuccess: () => void
}

const InitializeProgram: React.FunctionComponent<InitializeProgramProps> = ({ onSuccess }) => {
  const [ isSubmitting, setSubmitting ] = useState(false)

  const handleClick = async () => {
    if (isSubmitting) {
      return
    }

    try {
      setSubmitting(true)
      console.log('ping')

      const provider = getProvider()
      const program = getProgram()

      await program.rpc.startStuffOff({
        accounts: {
          systemProgram: web3.SystemProgram.programId,
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
        signers: [ baseAccount ],
      })

      const account = baseAccount.publicKey.toString()

      console.log('Created a new BaseAccount w/ address:', account)
      onSuccess()
    }
    catch (err) {
      console.log('Error creating BaseAccount account:', err)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={s.actionButton} onClick={handleClick}>
      Do One-Time Initialization For GIF Program Account
    </div>
  )
}

type ContentProps = {
  isGifsFetching: boolean
  isGifProgramInitialized: boolean
  onProgramInitialize: () => void
  submitGif: () => void
}

const Content: React.FunctionComponent<ContentProps> = (props) => {
  const { isGifsFetching, isGifProgramInitialized, onProgramInitialize, submitGif } = props

  const { isPhantomInstalled, isAttemptedToConnect, isConnecting, account, connect } = useConnect()

  if (isAttemptedToConnect) {
    return (
      <div className={s.loadingMessage}>Attempting to connect Phantom Wallet...</div>
    )
  }

  if (!isPhantomInstalled) {
    return (
      <div className={s.installNote}>
        Please install <a href={phantomWalletExtensionLink} target="_blank" rel="noreferrer">Phantom Wallet</a>
      </div>
    )
  }

  if (!account) {
    return (
      <div
        className={cx(s.actionButton, { [s.loading]: isConnecting })}
        onClick={connect}
      >
        {isConnecting ? 'Connecting...' : 'Connect wallet'}
      </div>
    )
  }

  if (isGifsFetching && !isGifProgramInitialized) {
    return (
      <div className={s.loadingMessage}>Checking if the program has been initialized...</div>
    )
  }

  if (isGifProgramInitialized) {
    return (
      <InitializeProgram onSuccess={onProgramInitialize} />
    )
  }

  return (
    <Form onSubmit={submitGif} />
  )
}

const CollectionPage: NextPage = () => {
  const { isFetching, gifs, handleProgramInitialize, submitGif } = useCollectionPage()

  const isGifProgramInitialized = !isFetching && !gifs
  const gifsToRender = gifs || PREVIEW_GIFS

  return (
    <>
      <div className={s.content}>
        <Content
          isGifsFetching={isFetching}
          isGifProgramInitialized={isGifProgramInitialized}
          onProgramInitialize={handleProgramInitialize}
          submitGif={submitGif}
        />
      </div>
      <Gallery items={gifsToRender} />
    </>
  )
}


export default CollectionPage
