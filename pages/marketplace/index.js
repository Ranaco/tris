import { Box, Container, Text } from '@chakra-ui/react';
import { StyledDiv } from '../../lib/custom-component';

const SidebarHeader = () => {
  return(
    <StyledDiv>

    </StyledDiv>
  )
}

const Sidebar = () => {
  return(
    <StyledDiv w = '25%' minW = '220px' h = '100%' bg = 'textGrey' maxW = '400px'>
      hello
    </StyledDiv>
  )
}

const Marketplace = () => {
  return(
    <StyledDiv w = '100%' h = '93.8vh' mt = '60px' display = 'flex' alignItems={'center'} justifyContent = 'start' >
      <Sidebar/>
      
    </StyledDiv>
  )
}

export default Marketplace;
