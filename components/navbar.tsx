import { Box, Container, Text, Input } from "@chakra-ui/react";
import getWindowDimensions from "../lib/device-viewport";
import React from "react";
import { FaInbox } from "react-icons/fa";
import { RiNotification4Fill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { MdArrowDropDown } from "react-icons/md";
import { SiMarketo } from "react-icons/si";
import { StyledDiv } from "../lib/custom-component";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from 'react'
import { AppState } from "../pages/_app";
import Image from 'next/image'

const CapsuleSearchBar = ({ handleChange, query }) => {
  const size = getWindowDimensions();
  return (
    <Input
      placeholder="#search"
      type="search"
      color="white"
      w={size.width < "960" ? "30vw" : "330px"}
      borderRadius="30px"
      backgroundColor="lightGrey"
      h="45"
      marginLeft="45px"
      value={query}
      onChange={handleChange}
      border="undefined"
    />
  );
};

const ProfileButton = ({ name, image }) => {
  const router = useRouter();

  return (
    <Container
      onClick={() => router.push("/profile")}
      as="span"
      color="white"
      _hover={{ boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="start"
      p={2}
      m={0}
      w="150px"
      h="45px"
      gap="5px"
      borderRadius="35px"
      bgColor="textGrey"
    >
      <Image
        src={image}
        height='35px'
        width='35px'
        style = {{
          borderRadius: '100px'
        }}
        />
      <Text
        w="70px"
        overflow="hidden"
        textOverflow="ellipses"
        display="inline-block"
        whiteSpace="nowrap"
        fontSize="15px"
        color="white"
      >
        {name}
      </Text>
      <MdArrowDropDown color="lightGrey" size="35" />
    </Container>
  );
};

export const CustomDivider = (
  { css, height, width, bgColor = "lightGrey" },
  props: any
) => {
  return (
    <Container
      height={height}
      css={css}
      width={width}
      opacity="0.5"
      bgColor={bgColor}
      p={0}
      m={0}
      {...props}
    />
  );
};

const Navbar = () => {
  const router = useRouter();
  const size = getWindowDimensions();
  const [query, setQuery] = useState("");
  const handleChange = (event: any) => setQuery(event.target.value);
  const [pageIsLoaded, setPageIsLoaded] = useState(false)
  const { state } = useContext(AppState);

  useEffect(() => {
    loadPage()
  }, [state.User]);

  const loadPage = () => {
    if (state.account !== "0x0") {
      setPageIsLoaded(true)
    }
  }

  return !pageIsLoaded ?
    <Box></Box> :
    (
      <Box
        css={{ backdropFilter: "blur(30px)" }}
        zIndex={4}
        position="fixed"
        h="60px"
        maxW="100%"
        w="100%"
        as="nav"
        display="flex"
        alignItems="center"
        justifyContent="start"
      >
        {size.width < "710" ? undefined : (
          <CapsuleSearchBar handleChange={handleChange} query={query} />
        )}{" "}
        {size.width < "710" ? undefined : <StyledDiv style={{ flex: "1" }} />}
        <Box
          mr="20px"
          display="flex"
          p={0}
          alignItems="center"
          justifyContent="center"
          gap="15px"
        >
          <SiMarketo
            color="lightGrey"
            size="30"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/marketplace")}
          />
          <FaInbox color="lightGrey" size="30" style={{ cursor: "pointer" }} />
          <RiNotification4Fill
            onClick={() => router.push("/signup")}
            size="30"
            color="lightGrey"
            style={{ cursor: "pointer" }}
          />
          {size.width > "710" ? undefined : <StyledDiv style={{ flex: "1" }} />}
          <CustomDivider height="40px" bgColor="lightGrey" width="1px" css={{}} />
          <ProfileButton name={state.User.name} image={state.User.profileUrl} />
          <CgMenuGridO
            style={{ cursor: "pointer" }}
            color="lightGrey"
            size="30px"
          />
        </Box>
      </Box>
    );
};

export default Navbar;
