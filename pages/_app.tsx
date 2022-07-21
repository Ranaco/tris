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
import LoadingScreen from "../components/loading-screen";

export interface IProviderProps {
  children?: any;
}

type AppContextState = { account: string, web3: any, provider: any, TrisNft: any, UserContract: any };

type AppContextValue = {
  state: AppContextState;
  setState: Dispatch<SetStateAction<AppContextState>>;
};

export const AppState = React.createContext<AppContextValue | undefined>(
  undefined
);

let providerOptions;

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

let web3Modal;

if(typeof window !== 'undefined'){
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
    UserContract: undefined,
    web3: undefined
  });

  useEffect(() => {
    let user: any;
    let isRegistered: boolean = false;
    if (web3Modal.cachedProvider) {
      connectWallet().then((web3) => {
        loadContracts({ state, setState, web3 }).then((data) => {
          const { Tris, User} = data;
          setState((val) => {
            return{
              ...val,
              TrisNft: Tris,
              UserContract: User
            }
          })
          user = User
        });
      });
    }

     getRegisteredUser(user).then((isIt) => {
      isRegistered = isIt
     })
    
    if (window.localStorage.getItem("isAuthenticated") != "true") {
      router.replace("/login");
    } else if (!isRegistered) {
      router.replace("/signup");
    } 
  }, [state.account]);

  const getRegisteredUser = async (UserContract: any) => {
    if(UserContract !== undefined){
      const isRegistered = await UserContract.methods.userIsRegistered(state.account).call()
    console.log("isRegistered :: ", isRegistered);
      return isRegistered
    }
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
    window.localStorage.setItem("isAuthenticated", "true");
    await getAccounts(provider);
    return web3;
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
    } else {
      console.log("Provider not connected");
    }

  };

  const getLayout = Component.getLayout;

  return getLayout ? (
    getLayout(
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
    )
  ) : (
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
  );
};

const getServerSideProps = async (ctx: any) => {

}

export default Website;
