import getWindowDimesions from '../lib/device-viewport.js'
import { StyledDiv } from '../lib/custom-component'
import Image from 'next/image'
import { Flex, Box, Text, Spacer } from '@chakra-ui/react'

const FollowPanel = ({ following, followers }) => {
    return(
      <Box
      display = "flex"

      borderTop ="0.5px solid grey" 
      opacity = "0.5" 
      borderBottom ="0.5px solid grey" 
      w = "100%" 
      h = "20%"
      mt = "20px"
      alignItems = "center"
      >
        <Box display = "flex" w= "50%" cursor = 'pointer' justifyContent = "center" alignItems = "center" flexDirection = "column">
            <Text color = "white" fontWeight = "bold">
            {following}
            </Text>
            <Text color = "lightGrey">
              Following
            </Text>
        </Box>
       <Box bg = "grey" opacity = "0.5" height = "80%" w = "0.5"/>
        <Box display = "flex" w = "50%" cursor = 'pointer' flexDirection = "column" justifyContent = "center" alignItems = "center">
            <Text  color = "white" fontWeight = "bold">
              {followers}
            </Text>
            <Text color = "lightGrey">
              Followers
            </Text>  
      </Box>
      </Box>
    )
}

const ProfileCard = ( { name, userName, bio, following, followers, profileUrl, wallUrl } ) => {
  const windowDimesion = getWindowDimesions()
  return(
    <Box
      display = "flex"
      wrap = "wrap"
      flexDirection = "column"
      alignItems = "center"
      justifyContent = "start"
      h = "55%"
      bg = "textGrey"
      w = "90%"
      borderRadius = "30px"
    >
    <Box w= "100%" h = "75px">
      <Image src = {wallUrl} alt = "Wall Image" lazyload/>
    </Box>
    <Box p = { 0 } h = "120px" w = "120px">
      <Image src = {profileUrl} alt = "User image" lazyload/> </Box> 
    <Text fontSize = "20px">
      <b>{ name }</b>
    </Text>
    <Text color = "lightGrey"> 
      @{ userName }
    </Text>
    <Box pt = "20px" w= "50%">
      <Text>
          { bio }
      </Text>
    </Box>
    <FollowPanel followers = {followers} following = {following}/>
      <Text cursor = 'pointer' color = "blue" fontSize = "30px" h = "20%" display = "flex" alignItems = "center" justifyContent = "center">
      My Profile
      </Text>
    </Box>
  )
}

export default ProfileCard
