import { StyledDiv } from '../lib/custom-component'
import getWindowDimensions from '../lib/device-viewport.js'
import ProfileCard from '../components/profile_card'
import { Flex, Text, Center, Square, Box } from '@chakra-ui/react'
import ProfileImage from '../public/images/profile.png'
import WallUrl from '../public/images/landscape.png'

const Homepage = () => {
  const windowDimension = getWindowDimensions()
  return( 
    <Flex color='white' mt = "10px" gap = "20px" w = "95%" flexDirection = "row">
  <Box w='30%' h = "100vh" flexBasis="70%" display={'flex'} alignItems = {'start'} justifyContent = {'start'} flexDirection = "column">
      <ProfileCard 
    profileUrl = {ProfileImage}
    wallUrl = {WallUrl}
    name = "Vishal_kr7"
    userName = "vishal_002"
    following = "200"
    followers = "5000"
    bio = "Hello there this is Vishal"
  />
  </Box>
  <Square h = "100vh" flex= '1' size='150px' flexBasis="100%">
    <Text>Box 2</Text>
  </Square>
  <Box w = "30vw" flexBasis="70%">
    <Text>Box 3</Text>
  </Box>
</Flex>
  )
}

export default Homepage
