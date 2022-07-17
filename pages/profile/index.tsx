import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { StyledDiv } from "../../lib/custom-component";
import Layout from "../../components/layouts/secondary";
import getWindowDimensions from "../../lib/device-viewport";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { AppState } from "../_app";
import Bio from '../../components/bio'

const UserData = {
  name: "Rosy",
  userName: "red_velvet8059",
  bio: "Nothing funny but you should see it once!",
  email: "rosy@gmail.com",
};

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

const EditableImage = () => {

  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')

  return (
    <StyledDiv
      maxH='100%'
      h='30%'
      display='flex'
      alignItems={'center'}
      justifyContent='center'
      flexDirection={'column'}>
      <StyledDiv
        position={'fixed'}
        w={isLargerThan1200 ? "57%" : "95%"}
        h='30%'
        bg='textGrey'
        mt='28px'
        borderRadius={isLargerThan1200 ? "0px 0px 20px 20px" : "20px"} />
      <Box position={'relative'} bottom='-65%'>
        <Box>
          <Image
            src="https://i.pravatar.cc/300?img=1"
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
            top: "-150px",
            backgroundColor: "black",
            borderRadius: "30px",
            right: "-120px",
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

  return (
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
          h='100%'
          bg='blue'
          w={isLargerThan1200 ? '60%' : '100%'}>
          <EditableImage />
          <Bio bio={UserData.bio} />
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
      </Flex>
    </Box>
  )
}

Profile.getLayout = (page: any) => <Layout title={"Profile"}>{page}</Layout>

export default Profile
