import Image from 'next/image'
import TrisImg from '../public/icons/tris_logo.png'
import { StyledDiv } from '../lib/custom-component'

const TrisLogo = () => {
  return(
    <StyledDiv justifySelf = 'start' h = '200px' w = '200px'>
    <Image src='/icons/tris_logo.png' alt="Tris Logo" height = '300px' width = '300px'/>
    </StyledDiv>
  )
}

export default TrisLogo
