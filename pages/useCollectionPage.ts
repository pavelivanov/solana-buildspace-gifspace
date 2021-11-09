import { useEffect } from 'react'
import { useConnect } from 'wallet'
import { useReducerState } from 'hooks'
import { getProgram, getGifAccount } from 'helpers'


type State = {
  isFetching: boolean
  gifs: string[] | null
}

const initialState: State = {
  isFetching: false,
  gifs: null,
}

const useCollectionPage = () => {
  const { account } = useConnect()

  const [ state, setState ] = useReducerState<State>(initialState)

  const fetchGifs = async () => {
    try {
      console.log('start gifs fetching')

      setState({ isFetching: true })

      const program = getProgram()
      const gifAccount = getGifAccount(account)

      const data = await program.account.baseAccount.fetch(gifAccount.publicKey) as {
        gifList: Array<{ gifLink: string }>
      }

      console.log('Got the data:', data)

      setState({
        isFetching: false,
        gifs: data.gifList.map(({ gifLink }) => gifLink),
      })
    }
    catch (err) {
      console.error(err)
      setState({ isFetching: false })
    }
  }

  useEffect(() => {
    if (account) {
      fetchGifs()
    }
  }, [ account ])

  const handleProgramInitialize = () => {
    fetchGifs()
  }

  const submitGif = async () => {
    try {
      // ugly, but whatever :)
      const input = document.getElementById('gifInput') as HTMLInputElement
      const inputValue = input.value

      if (inputValue.length === 0) {
        console.log('No gif link given!')
        return
      }

      console.log('Gif link:', inputValue)

      const program = getProgram()
      const gifAccount = getGifAccount(account)

      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: gifAccount.publicKey,
        },
      })

      console.log('GIF successfully sent to program:', inputValue)

      await fetchGifs()
    }
    catch (err) {
      console.error(err)
    }
  }

  return {
    ...state,
    handleProgramInitialize,
    submitGif,
  }
}


export default useCollectionPage
