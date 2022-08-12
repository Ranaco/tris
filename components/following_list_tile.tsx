import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { StyledDiv } from "../lib/custom-component";
import Image from "next/image";
import React, { useState, useEffect, useContext } from 'react'
import { AppState } from '../pages/_app'
import { parseUserData } from '../lib/ipfs-storage'


interface FollowerTileInterface {
  profileUrl: string,
  name: string,
  userName: string
}

const FollowerTile: React.FC<FollowerTileInterface> = ({ profileUrl, name, userName }) => {
  return (
    <StyledDiv
      w="100%"
      h="90px"
      gap="5%"
      display="flex"
      alignItems="center"
      justifyContent="start"
      flexDirection="row"
    >
      <Box h="70px" w="70px" p="5px">
        <Image
          style={{ borderRadius: "100px" }}
          layout="responsive"
          src={profileUrl}
          alt="profile image"
          height="80px"
          width="80px"
        />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        h="80%"
      >
        <Text color="white" fontSize="20px">
          {name}
        </Text>
        <Text color="grey" fontSize="15px">
          @{userName}
        </Text>
      </Flex>
      <StyledDiv style={{ display: "flex" }} />
      <Button borderRadius={"100px"} color="black" bgColor="white">
        Follow back
      </Button>
    </StyledDiv>
  );
};

interface FollowingListTileInterface {
  followers: any
}

const FollowingListTile: React.FC<FollowingListTileInterface> = ({ followers }) => {
 
  const [ pageIsLoaded, setPageIsLoaded ] = useState(false) 
  const [followingData, setFollowingData ] = useState([])
  const { state } = useContext(AppState) 

  useEffect(() => { 
    loadPage().then((val) => {
      if(val){
        addFollowerData()
      }
    })
  }, [])

  const loadPage = async () => {
    if (state.account !== "0x0") {
      console.log("This is the state, ", state)
      setPageIsLoaded(true)
    return true 
    }
  }

  const addFollowerData = async () => {
    followers.map(async (address: any) =>  {
      const currFollower = await state.UserContract.methods.getUserData(address).call() 
      const parsedFollower = await parseUserData({ User: currFollower, posts: [] })
      setFollowingData((val) => {
        return[ 
          ...val,
          parsedFollower
        ] 
      })
    }) 
  }

  return !pageIsLoaded ?
  <Box></Box> : 
    (
    <StyledDiv
      w="100%"
      bg="rgba(27, 39, 48, 0.5)"
      css={{ backdropFilter: 'blur(30px)' }}
      borderRadius="20px"
      p="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="10px"
      flexDirection="column"
    >
      <Text fontWeight="bold" alignSelf={"start"} p="10px" fontSize="22px">
        Who is following you
      </Text>
      {followingData.map((follower) => {
        return (
          <FollowerTile
            profileUrl={follower.profileUrl}
            name={follower.name}
            userName={follower.userName}
          />
        );
      })}
      <Text cursor="pointer" color="blue" fontSize="1em" alignSelf="start">
        Show More
      </Text>
    </StyledDiv>
  );
};

export default FollowingListTile;
