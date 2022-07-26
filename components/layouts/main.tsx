import { StyledDiv } from "../../lib/custom-component";
import * as React from "react";
import { Global } from "@emotion/react";
import Head from "next/head";
import NavBar from "../navbar";
import { AppState } from '../../pages/_app'
import { useContext, useEffect, useState } from 'react'
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";
import { Box } from "@chakra-ui/react";

export const ScrollBarStyle = () => {
  return (
    <Global
      styles={`
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #28343E;
        border-radius: 10px;
      }
      `}
    />
  );
};

interface Main {
  children;
  router: any;
}
//<title> Tris - {router.asPath == '/marketplace' ? 'Marketplace' : 'Home'} </title>
const Main: React.FC<Main> = ({ children, router }) => {

  return (
    <StyledDiv as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The web3 social media with a twist" />
        <title>
          {" "}
          Tris - {router.asPath == "/marketplace" ? "Marketplace" : "Home"}{" "}
        </title>
      </Head>
      <StyledDiv
        flexDirection={"column"}
        display="flex"
        alignItems="center"
        justifyContent="start"
      >
        <NavBar />
        <StyledDiv
          backgroundImage="url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)"
          backgroundPosition="center"
          maxH="100%"
          h="100vh"
          w="100%"
          maxW={"100%"}
          display={"flex"}
          alignSelf="center"
          justifyItems={"center"}
          key={router.asPath}
        >
          {children}
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  );
};

export default Main;
