import React, { createContext, useContext, useEffect } from 'react'
import { useReducerState } from 'hooks'


type State = {
  isAttemptedToConnect: boolean
  isConnecting: boolean
  account: string | null
}

type WalletContext = State & {
  isPhantomInstalled: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const Context = createContext<WalletContext>(null as any)

export const useConnect = (): WalletContext => {
  return useContext(Context)
}

const initialState: State = {
  isAttemptedToConnect: true,
  isConnecting: false,
  account: null,
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [ state, setState ] = useReducerState(initialState)

  const isPhantomInstalled = Boolean(window?.solana?.isPhantom)

  const checkIfWalletIsConnected = async () => {
    try {
      if (window?.solana?.isPhantom) {
        console.log('Phantom wallet found!')

        // The solana object gives us a function that will allow us to connect directly with the user's wallet!
        const response = await window.solana.connect({ onlyIfTrusted: true })
        const account = response.publicKey.toString()

        console.log('Connected with Public Key:', account)

        setState({
          isAttemptedToConnect: true,
          account,
        })
      }
    }
    catch (err) {
      console.error(err)
    }

    setState({ isAttemptedToConnect: true })
  }

  useEffect(() => {
    // TODO disabled bcs of https://github.com/phantom-labs/docs/issues/17 - added on 11/9/21 by pavelivanov
    // checkIfWalletIsConnected()

    // emulate connection
    setTimeout(() => {
      setState({ isAttemptedToConnect: false })
    }, 1000)
  }, [])

  const connect = async () => {
    if (!window.solana || state.isConnecting) {
      return
    }

    try {
      setState({ isConnecting: true })

      const response = await window.solana.connect()
      const account = response.publicKey.toString()

      console.log('Connected with Public Key:', account)

      setState({ isConnecting: false, account })
    }
    catch (err) {
      console.error(err)
      setState({ isConnecting: false })
    }
  }

  const disconnect = () => {
    window.solana.disconnect()
    setState({ account: null })
  }

  const context = {
    ...state,
    isPhantomInstalled,
    connect,
    disconnect,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}
