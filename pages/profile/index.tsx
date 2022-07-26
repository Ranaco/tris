import { Box, Flex, useMediaQuery, Text } from "@chakra-ui/react";
import { StyledDiv } from "../../lib/custom-component";
import Layout from "../../components/layouts/secondary";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { AppState } from "../_app";
import Bio from '../../components/bio'
import { useContext, useEffect, useState } from 'react'
import image from '../../public/images/background.jpg'

const BackButton = () => {
  const handleClick = () => {
    history.go(-1);
  };
  return (
    <Box
      cursor="pointer"
      bg="lightGrey"
      justifyContent={"center"}
      onClick={handleClick}
      w="40px"
      borderRadius="10px"
      m="10px"
      h="40px"
      display="flex"
      alignItems="center"
    >
      <IoIosArrowBack size="2.0rem" />
    </Box>
  );
};

const EditableImage = ({ image }) => {

  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')

  return (
    <StyledDiv
      maxH='100%'
      h='30.4%'
      mb='auto'
      display='flex'
      w='100%'
      alignItems={'center'}
      justifyContent='center'
      flexDirection={'column'}>
      <StyledDiv
        position={'fixed'}
        w={isLargerThan1200 ? "57%" : "93.7%"}
        h='30%'
        bg='textGrey'
        mt='28px'
        borderRadius={isLargerThan1200 ? "0px 0px 20px 20px" : "20px"} />
      <Box
        mt={isLargerThan1200 ? '30%' : '285px'}
        w='100%'
        display={'flex'}
        justifyContent={isLargerThan1200 ? 'start' : 'center'}
      >
        <Box alignSelf={'center'}>
          <Image
            src={image}
            style={{ borderRadius: "100px" }}
            alt="profile"
            height="150px"
            width="150px"
          />
        </Box>
        <TbEdit
          style={{
            cursor: 'pointer',
            position: "relative",
            backgroundColor: "black",
            borderRadius: "30px",
            left: '-30px',
            height: "30px",
            width: "30px",
            padding: "6px",
          }}
          onClick={() => window.localStorage.setItem("isAuthenticated", "false")}
          size="20px"
          color="white"
        />
      </Box>
    </StyledDiv>
  );
};

const Profile = () => {

  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')
  const { state } = useContext(AppState)
  const firstThreeAddress = state.account.slice(state.account.length - 3, state.account.length)
  const lastThreeAddress = state.account.slice(0, 3)
  const [pageIsLoaded, setPageIsLoaded] = useState(false)

  useEffect(() => {
    loadPage()
    console.log("This is a original image :: ", image)
    if (state.User !== undefined) {
      console.log("This is the web image :: ", state.User.profileUrl)
    }
  }, [state.User])
  const loadPage = () => {
    if (state.account !== "0x0") {
      setPageIsLoaded(true)
    }
  }
  return !pageIsLoaded ?
    <Box></Box>
    :
    (
      <Box
        h='100%'
        w='100%'
        display='flex'
        alignSelf='center'
        justifyContent='center'
      >
        <Flex
          alignSelf={'center'}
          w='95%'
          justifyContent={'end'}
          bg='#213545'
          h='90%'
          borderRadius={'20px'}
        >
          {
            isLargerThan1200 ?
              <Box
                flexBasis={'20%'}
                bgImage="url('https://w0.peakpx.com/wallpaper/190/187/HD-wallpaper-whatsapp-cartoon-skull-dark-dead-punk.jpg')"
                css={{ backdropFilter: "blur(10px)" }}
                borderRadius={'20px 0px 0px 20px'}
                opacity='0.4'
                h='100%'
              /> : undefined
          }
          <Box
            flexBasis={isLargerThan1200 ? '60%' : '100%'}
            display='flex'
            alignItems={'start'}
            justifyContent='end'
            flexDir={'column'}
            h='100%'
            w={isLargerThan1200 ? '60%' : '100%'}>
            <EditableImage image={state.User.profileUrl} />
            <Box
              w='100%'
              h='65%'
              display={'flex'}
              alignItems='center'
              justifyContent={'space-between'}
              flexDirection={isLargerThan1200 ? 'row' : 'column'}
            >
              <Box
                pt='8%'
                w={isLargerThan1200 ? '30%' : '70%'}
                h='100%'
              >
                <Text pl='30px' pt='30px'>
                  {firstThreeAddress}...{lastThreeAddress}
                </Text>
                <Text
                  mt={isLargerThan1200 ? '0px' : '60px'}
                  w='100%'
                  pl='30px'
                  fontSize={'2em'}
                  fontWeight='bold'
                  h='50px'>
                  {state.User.name}
                </Text>
                <Text fontSize='1.2em' pl='30px' color='grey'>
                  @{state.User.userName}
                </Text>
                <Bio bio={state.User.bio} />
              </Box>
              <Box
                w='100%'
                h='100%'
                overflow={'scroll'}
              >
                <Box h='50px' display='flex' alignItems='center' justifyContent={'start'}>
                  <Text fontSize='1.4em' pl='5px'>
                    Uploads
                  </Text>
                </Box>
                <Box
                  pt='10%'
                  mt='5px'
                  flex={isLargerThan1200 ? '1' : undefined}
                  ml={isLargerThan1200 ? '5px' : undefined}
                  bg='blackAlpha.200'
                  borderRadius={'20px'}
                  w={isLargerThan1200 ? undefined : '100%'}
                >
                  <Box
                    h='100vh'
                  >
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {
            isLargerThan1200 ?
              <Box
                bg='blue'
                flexBasis={'20%'}
                bgImage="url('https://w0.peakpx.com/wallpaper/190/187/HD-wallpaper-whatsapp-cartoon-skull-dark-dead-punk.jpg')"
                css={{ backdropFilter: "blur(10px)" }}
                borderRadius={'0px 20px 20px 0px'}
                opacity='0.4'
                h='100%'
              /> : undefined
          }
        </Flex >
      </Box >
    )
}

Profile.getLayout = (page: any) => <Layout title={"Profile"}>{page}</Layout>

export default Profile
