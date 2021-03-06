import { Box, Text } from "@chakra-ui/react";
import { StyledDiv } from "../lib/custom-component";
import Image from "next/image";
import * as React from 'react'
import { useRouter } from 'next/router'

const FollowPanel = ({ following, followers, props }) => {
  return (
    <Box
      display="flex"
      css={props}
      borderTop="0.5px solid grey"
      opacity="0.5"
      borderBottom="0.5px solid grey"
      w="100%"
      h="20%"
      mt="20px"
      alignItems="center"
    >
      <Box
        display="flex"
        w="50%"
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text color="white" fontWeight="bold" fontSize="1em">
          {following}
        </Text>
        <Text color="grey" fontSize="0.8em">
          Following
        </Text>
      </Box>
      <Box bg="grey" opacity="0.5" height="60%" w="0.5" />
      <Box
        display="flex"
        w="50%"
        cursor="pointer"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontSize="1em" fontWeight="bold">
          {followers}
        </Text>
        <Text color="grey" fontSize="0.8em">
          Followers
        </Text>
      </Box>
    </Box>
  );
};

interface ProfileCardInterface {
  following: string,
  profileUrl: any,
  wallUrl: any,
  followers: string,
  name: string,
  userName: string,
  bio: string
}

const ProfileCard: React.FC<ProfileCardInterface> = ({
  following,
  profileUrl,
  wallUrl,
  followers,
  name,
  userName,
  bio,
}) => {

  const router = useRouter()

  return (
    <StyledDiv
      maxH="100%"
      h="60%"
      w="100%"
      borderRadius="20px"
      flexDirection="column"
      bg="textGrey"
      display="flex"
      alignItems="center"
      justifyContent="start"
    >
      <Box w="100%" h="5%">
        <Image
          layout="responsive"
          height={"200%"}
          src={wallUrl}
          alt="wall_url"
        />
      </Box>
      <Box borderRadius="100px" h="25%" w="25%" zIndex={"1"} paddingTop="18%">
        <Image layout="responsive" src={profileUrl} alt="profile_url" />
      </Box>
      <Text fontSize="1em" paddingTop="20%" fontWeight="bold">
        {name}
      </Text>
      <Text color="grey" fontSize="0.8em">
        @{userName}
      </Text>
      <Text
        paddingTop="10px"
        textAlign={"center"}
        color="grey"
        fontWeight={"bold"}
        fontSize="1em"
        width="50%"
      >
        {bio}
      </Text>
      <FollowPanel
        following={following}
        followers={followers}
        props={{ marginTop: "8%" }}
      />
      <Text p="20px" color="blue" onClick={() => { router.push('/profile') }} cursor="pointer" fontSize="1.3em">
        My Profile
      </Text>
    </StyledDiv>
  );
};

export default ProfileCard;
