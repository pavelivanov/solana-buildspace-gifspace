import { Connection, clusterApiUrl } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'
import type { Commitment } from '@solana/web3.js'
import { Provider, Program, web3 } from '@project-serum/anchor'
import type { Idl } from '@project-serum/anchor'

import idl from './idl.json'


export const PREVIEW_GIFS = [
  'https://media.giphy.com/media/l0O7NvDd6lifNaNuo/giphy.gif',
  'https://media.giphy.com/media/J3GvwYLogUVgY/giphy.gif',
  'https://media.giphy.com/media/PkKzNQjwPy7GvxZbfe/giphy.gif',
]

const network = clusterApiUrl('devnet')
const programId = new PublicKey(idl.metadata.address)

// Control's how we want to acknowledge when a transaction is "done"
const opts = { preflightCommitment: 'processed' as Commitment }

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment)
  return new Provider(connection, window.solana, opts)
}

export const getProgram = () => {
  const provider = getProvider()
  return new Program(idl as Idl, programId, provider)
}

export const getGifAccount = (account: string | null) => {
  let keypair = localStorage.getItem(`gifverse-gif-keypair-for-${account}`)

  if (!keypair) {
    keypair = JSON.stringify(web3.Keypair.generate())

    localStorage.setItem(`gifverse-gif-keypair-for-${account}`, keypair)
  }

  keypair = JSON.parse(keypair)

  // @ts-ignore
  const arr = Object.values(keypair._keypair.secretKey)
  // @ts-ignore
  const secret = new Uint8Array(arr)

  return web3.Keypair.fromSecretKey(secret)
}
