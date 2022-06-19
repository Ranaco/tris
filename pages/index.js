import getWindowDimensions from '../lib/device-viewport.js'
import ProfileCard from '../components/profile_card'
import { Container } from '@chakra-ui/react'

const Homepage = () => {
  
  const windowDimension = getWindowDimensions()

  return( 
    <Container w = "100vw" bg="yellow" p = { 0 }css = {{ display: "flex", alignItems: "center", justifyContent: "start"}}>
    <div style = {{ width: "100vw"}}>
      <ProfileCard
      name = "TRIS"
      userName = "tris002"
      bio = "Hlo! there"
    />
    </div>
    </Container>
  )
}

export default Homepage
