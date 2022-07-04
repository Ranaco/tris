import { ChakraProvider } from '@chakra-ui/react'
import Layout, { ScrollBarStyle } from '../components/layouts/main'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'
import { sequence } from '0xsequence'
import React, { useState, useEffect } from 'react'
import theme from '../lib/theme.js'
import { Megrim, MPLUS, Tillana, ShadowsIntoLight, Rubik, PermanentMarker, Sacramento } from '../components/fonts'
export const AppState = React.createContext()

let providerOptions

if (typeof window !== 'undefined') {
  if (!window?.ethereum?.isSequence) {
    providerOptions = {
      ...providerOptions,
      sequence: {
        package: sequence,
        options: {
          appName: 'Tris',
          defaultNetwork: 'polygon'
        }
      }
    }
  }
}

let web3Modal;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
  })
}

const Website = ({ Component, pageProps }) => {

  const router = useRouter()
  const [provider, setProvider] = useState(undefined)
  const [state, setState] = useState({
    isAuthenticated: false,
    account: "0x0",
  })

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet()
    }
    setState((val) => {
      return {
        ...val,
        isAuthenticated: provider !== undefined && provider.provider.isMetaMask !== false
      }
    })
    if (provider === undefined || !state.isAuthenticated) {
      router.replace('/login')
    }
  }, [])

  const connectWallet = async () => {
    console.log("Connecting wallet")
    const wallet = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(wallet)
    if (wallet.sequence) {
      (provider).sequence = wallet.sequence
    }
    // setState((val) => {
    //   return {
    //     ...val,
    //    provider: provider
    //   }
    // })
    getAccounts(provider)
  }

  const getAccounts = async (provider) => {
    if (provider != null) {
      const signer = provider.getSigner()
      const account = await signer.getAddress()
      setState((val) => {
        return {
          ...val,
          account: account
        }
      })
    } else {
      console.log("Provider not connected")
    }
  }

  const getLayout = Component.getLayout

  return getLayout ? (
    getLayout(<ChakraProvider theme={theme}>
      <MPLUS />
      <ShadowsIntoLight />
      <Rubik />
      <Sacramento />
      <Tillana />
      <Megrim />
      <PermanentMarker />
      <ScrollBarStyle />
      <AppState.Provider value={[state, setState]}>
        <Component {...pageProps} key={router.route} />
      </AppState.Provider>
    </ChakraProvider>
    )
  ) : (
    <ChakraProvider theme={theme}>
      <MPLUS />
      <ShadowsIntoLight />
      <Rubik />
      <Tillana />
      <Megrim />
      <Sacramento />
      <PermanentMarker />
      <ScrollBarStyle />
      <AppState.Provider value={[state, setState]}>
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AppState.Provider>
    </ChakraProvider>
  )
}

export default Website
