import { ChakraProvider } from "@chakra-ui/react";
import Layout, { ScrollBarStyle } from "../components/layouts/main";
import { ethers } from "ethers";
import loadContracts from "../lib/load-contracts";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Web3 from "web3";
import { sequence } from "0xsequence";
import React, { Dispatch, useState, useEffect, SetStateAction } from "react";
import theme from "../lib/theme";
import {
  Megrim,
  MPLUS,
  ShadowsIntoLight,
  Rubik,
  PermanentMarker,
  Sacramento,
} from "../components/fonts"
import { AppProps } from "next/app";
import { CookiesProvider } from 'react-cookie'
import { parseUserData } from '../lib/ipfs-storage'

export interface IProviderProps {
  children?: any;
}

type AppContextState = { account: string, disconnectWallet: any, posts: any, web3: any, provider: any, TrisNft: any, UserContract: any, isRegistered: any, User: any };

type AppContextValue = {
  state: AppContextState;
  setState: Dispatch<SetStateAction<AppContextState>>;
};

export const AppState = React.createContext<AppContextValue | undefined>(
  undefined
);

let providerOptions: any;

if (typeof window !== "undefined") {
  if (!window?.ethereum?.isSequence) {
    providerOptions = {
      ...providerOptions,
      sequence: {
        package: sequence,
        options: {
          appName: "Tris",
          defaultNetwork: "polygon",
        },
      },
    };
  }
}

let web3Modal: any;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
  });
}

interface WebsiteInterface {
  Component: any,
  pageProps: AppProps
}

const Website: React.FC<WebsiteInterface> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [state, setState] = useState({
    account: "0x0",
    TrisNft: undefined,
    provider: undefined,
    disconnectWallet: undefined,
    UserContract: undefined,
    posts: [{
      basePrice: "10",
      comments: [],
      commentsCount: "0",
      isForSale: true,
      isNft: true,
      likes: "0",
      owner: "0x85d0FB03bDe8D9F5446660609D81505e895DaF15",
      post: "ipfs://bafybeida73knuhq2jnwjaktmisju4xhbot2hf67zzi6ly5lnh7u6axlr2a/1659539109594.png",
      postId: "0xc201826ef5ba10f51eb2543f1bcc9d1fc375994deb8f42224ef7a55af313b049",
      postIsBought: false,
      priceByOwner: "100",
      seller: "0xA9605c1819BF88140b0B8C6DBaC52A71746E3dB2",
      title: "Creative",
      tokenId: "1"
    }],
    web3: undefined,
    isRegistered: false,
    User: undefined,
  });

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)

  useEffect(() => {

    const disconnectWallet = () => {
      web3Modal.clearCachedProvider()

      try {
        if (provider && (provider as any).sequence) {
          const wallet = (provider as any).sequence as sequence.Wallet
          wallet.disconnect()
        }
        setProvider(null)
        return true
      } catch (err) {
        console.log(err)
      }
      return false
    }

    const connect = async () => {
      if (web3Modal.cachedProvider) {
        await connectWallet().then((res) => {
          const { web3, account } = res;
          loadContracts({ state, setState, web3 }).then((data) => {
            const { Tris, User } = data;
            setState((val) => {
              return {
                ...val,
                TrisNft: Tris,
                UserContract: User,
                disconnectWallet: disconnectWallet
              }
            })
            getRegisteredUser({ UserContract: User, account: account }).then((isIt) => {
              if (isIt) {
                setState((val) => {
                  return {
                    ...val,
                    isRegistered: isIt
                  }
                })
                if (isIt) {
                  window.localStorage.setItem("isAuthenticated", "true");
                } else {
                  window.localStorage.setItem("isAuthenticated", "false");
                }
              }
            })
          });
        });
      }
    }
    connect();
    if (window.localStorage.getItem("isAuthenticated") != "true") {
      router.replace("/login");
    }

  }, [state.account]);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  const getRegisteredUser = async ({ UserContract, account }) => {
    let isIt: boolean
    let currUser: any;
    if (UserContract !== undefined) {
      isIt = await UserContract.methods.userIsRegistered(account).call()
      if (isIt) {
        try {
          currUser = await UserContract.methods.getUserData(account).call()
          const posts = await UserContract.methods.getUserPosts(account).call()
          const user = await parseUserData({ User: currUser, posts: posts })
          let frozenPosts = await UserContract.methods.getAllPost(account).call()
          let allPosts = JSON.parse(JSON.stringify(frozenPosts))
          allPosts = allPosts.map((post: any) => {
            return {
              post: post[0],
              postId: post[1],
              title: post[3],
              priceByOwner: post[10],
              basePrice: post[11],
              isForSale: post,
              isNft: post[12],
              owner: post[7],
              seller: post[8],
              tokenId: post[13],
              comments: post[9],
              commentsCount: post[6],
              likes: post[2],
              postIsBought: post[5]
            }
          })
          console.log("Current user :: ", user);
          setState((val) => {
            return {
              ...val,
              User: user,
              posts: shuffle(allPosts)
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
    return isIt
  }

  const connectWallet = async () => {
    console.log("Connecting wallet");
    const wallet = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(wallet);
    const web3 = new Web3(wallet);
    setState((val) => {
      return {
        ...val,
        web3: web3,
        provider: provider,
      }
    });
    if (wallet.sequence) {
      (provider as any).sequence = await wallet.sequence;
    }
    const account = await getAccounts(provider);
    setProvider(provider)
    return { web3, account };
  };

  const getAccounts = async (provider: any) => {
    if (provider != null) {
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      setState((val) => {
        return {
          ...val,
          account: account,
        };
      });
      return account
    } else {
      console.log("Provider not connected");
    }

  };

  const getLayout = Component.getLayout;

  return getLayout ? (
    getLayout(
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <MPLUS />
          <ShadowsIntoLight />
          <Rubik />
          <Sacramento />
          <Megrim />
          <PermanentMarker />
          <ScrollBarStyle />
          <AppState.Provider value={{ state, setState }}>
            <Component {...pageProps} key={router.route} />
          </AppState.Provider>
        </ChakraProvider>
      </CookiesProvider>
    )
  ) : (
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <MPLUS />
        <ShadowsIntoLight />
        <Rubik />
        <Megrim />
        <Sacramento />
        <PermanentMarker />
        <ScrollBarStyle />
        <AppState.Provider value={{ state, setState }}>
          <Layout router={router}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </AppState.Provider>
      </ChakraProvider>
    </CookiesProvider>
  );
};


export default Website;
