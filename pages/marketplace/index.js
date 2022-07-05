import { Box, Container, Text } from '@chakra-ui/react';
import { StyledDiv } from '../../lib/custom-component';
import  { useEffect, useContext } from 'react'
import { AppState } from '../_app';

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

  const [ state, setState ] = useContext(AppState)

  useEffect(() => {
    const logState = () => {
     console.log("This is the state from Marketplace :: ", state)
    }  
    logState()
  }, [])

  return(
    <StyledDiv w = '100%' h = '93.8vh' mt = '60px' display = 'flex' alignItems={'center'} justifyContent = 'start' >
      <Sidebar/>
      
    </StyledDiv>
  )
}

export default Marketplace;
