import { Container, Box } from '@chakra-ui/react'
import getWindowDimesions from '../lib/device-viewport.js'

const ProfileCard = ( { name, userName, bio, following, followers } ) => {
  
  const windowDimesion = getWindowDimesions()

  return(
    <Container
      h = "60vh"
      bg = "textGrey"
      w = "45vw"
      borderRadius = "20px"
    >
      
    </Container>
  )
}

export default ProfileCard
