import {
  Text,
  Flex,
  Show,
  Hide,
  Button,
} from "@chakra-ui/react";
import { StyledDiv } from "../../lib/custom-component";
import Layout from "../../components/layouts/secondary";
import getWindowDimensions from "../../lib/device-viewport";
import TrisLogo from "../../components/logo";
import Web3Modal from "web3modal";
import { sequence } from "0xsequence";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ethers } from "ethers";
import MetaMaskLogo from "../../public/icons/metamask.png";
import { useEffect, useState } from "react";
import { AppState } from "../_app";

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

let web3Modal;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
  });
}

const Login = () => {
  const [provider, setProvider] = useState(undefined);
  const size = getWindowDimensions();
  const router = useRouter();
  const { state, setState } = useContext(AppState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    }

  }, []);

  const connectWeb3Modal = async () => {
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
    }
    connectWallet();
  };

  const connectWallet = async () => {
    console.log("Connecting wallet");
    const wallet = await web3Modal.connect();
    const provider: any = new ethers.providers.Web3Provider(wallet);
    console.log("Wallet connection successful");

    if (wallet.sequence) {
      provider.sequence = wallet.sequence;
    }
    setProvider(provider);
    console.log("This is the provider:: ", provider);
    await getAccounts(provider).then((account) => {
      console.log("This is the state :: ", state);
      if (account !== undefined) {
        router.replace("/signup");
      }
    });

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
      return account;
    } else {
      console.log("Provider was not connected");
    }
  };

  return (
    <Flex w="100%" p="30px" h="100vh" gap="30px">
      <Show breakpoint="(min-height: 750px)">
        <Hide breakpoint="(max-width: 1090px)">
          <StyledDiv
            flexBasis="30%"
            p="10px"
            display="flex"
            alignItems="center"
            justifyContent="start"
            flexDirection="column"
            h="93.8vh"
            borderRadius="20px"
            w="100%"
            css={{ backdropFilter: "blur(40px)" }}
            fontFamily="Megrim"
          >
            <TrisLogo />
            <Text position="fixed" top="17%" color="lightGrey" fontSize="15em">
              Tris
            </Text>
            <StyledDiv
              w="80%"
              position="relative"
              top="28%"
              bg="textGrey"
              h="1px"
            />
            <Text
              position="relative"
              top="35%"
              fontFamily="'M PLUS Rounded 1c'"
              textAlign="center"
              color="lightGrey"
              fontSize="4.4em"
              alignSelf="center"
            >
              Welcome to &nbsp;
              <span style={{ fontFamily: "Megrim", fontWeight: "bold" }}>
                Tris.
              </span>
              <br />{" "}
              <StyledDiv
                style={{
                  fontFamily: "Shadows Into Light",
                  fontSize: "0.4em",
                  textAlign: "center",
                  paddingTop: "10px",
                }}
              >
                {" "}
                The{" "}
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
                  web3
                </span>{" "}
                social media platform!{" "}
              </StyledDiv>
            </Text>
          </StyledDiv>
        </Hide>
      </Show>
      <StyledDiv
        flexBasis={size.width < "1091" ? "100%" : "70%"}
        display="flex"
        pt="4%"
        pl="30px"
        alignItems="start"
        justifyContent="start"
        h="100%"
        borderRadius="20px"
        flexDirection="column"
        w="100%"
        css={{ backdropFilter: "blur(40px)" }}
      >
        <Text fontSize="4em" w="100%">
          Login with your <br />
          <span style={{ fontWeight: "bold", color: "lightgrey" }}>
            web3
          </span>{" "}
          wallet!
        </Text>
        <Text
          alignSelf="center"
          textAlign="center"
          w="100%"
          pt="10%"
          fontSize="3em"
        >
          Continue with:
        </Text>
        <Button
          onClick={connectWeb3Modal}
          alignSelf="center"
          mt="100px"
          w="300px"
          h="60px"
          display="flex"
        >
          <Image
            src={MetaMaskLogo}
            alt="Tris logo"
            style={{ alignSelf: "start" }}
          />
          <Text pl="30px" fontSize="2em" fontWeight="light">
            Metamask
          </Text>
        </Button>
      </StyledDiv>
    </Flex>
  );
};

Login.getLayout = (page: JSX.Element) => {
  return <Layout title="Tris - Login">{page}</Layout>;
};

export default Login;
