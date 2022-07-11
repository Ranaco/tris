import { ChakraProvider } from "@chakra-ui/react";
import Layout, { ScrollBarStyle } from "../components/layouts/main";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
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

export interface IProviderProps {
  children?: any;
}

type AppContextState = { account: string; isAuthenticated: boolean };

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

if (typeof window !== "undefined") {
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
    isAuthenticated: false,
  });

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
    if (window.localStorage.getItem("isAuthenticated") != "true") {
      router.replace("/login");
    }
  }, []);

  const connectWallet = async () => {
    console.log("Connecting wallet");
    const wallet = await web3Modal.connect();
    const provider: any = new ethers.providers.Web3Provider(wallet);
    if (wallet.sequence) {
      provider.sequence = wallet.sequence;
    }
    window.localStorage.setItem("isAuthenticated", "true");
    getAccounts(provider);
  };

  const getAccounts = async (provider) => {
    if (provider != null) {
      const signer = provider.getSigner();
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

export default Website;
