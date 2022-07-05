import { useContext, useState, useEffect } from 'react'
import { AppState } from '../_app'
import { StyledDiv } from '../../lib/custom-component'
import Layout from '../../components/layouts/secondary'
import { Input, Show, Hide, Box, Flex, Container, Text } from '@chakra-ui/react'
import TrisLogo from '../../components/logo'

const TextField = () => {
  return(
    <Input/>
  )
}

const MastHead = () => {
  return(
    <StyledDiv w = '100%' h = '20%' mt = '10px' display = 'flex' alignItems = 'center' justifyContent = 'start'>
      <TrisLogo mt = '40px'/> 
      <Text fontFamily = 'Megrim' fontSize = '8em' >
          Tris
      <Text fontFamily = 'Shadows Into Light' fontSize = '0.2em'>
         The <span style={{ fontWeight: 'bold', textAlign: 'center' }}>web3</span> social media platform! 
      </Text>
      </Text>
        <Hide breakpoint='(max-width: 1100px)'>
      <StyledDiv fontWeight = 'semibold' flexDirection = 'column' display = 'flex' alignItems = 'end' pr = '30px' justifyContent = 'end' ml = 'auto' alignSelf = 'end'>
        <Text fontSize = '1.7em' color = '#cacccf'>
          Start for free
        </Text>
        <Text fontSize = '2.3em'>
          Tell us more about yourself.
        </Text>
      </StyledDiv>
    </Hide>
    </StyledDiv>
  )
}

const SignUp = () => {
  return(
    <StyledDiv h = '100vh' w = '100%' display = 'flex' alignItems = 'center' justifyContent = 'center' >
     <Box h = '90%'  w = '95%' borderRadius = '20px' css = {{ backdropFilter: 'blur(20px)' }}>
      <MastHead/>
      
     </Box>         
    </StyledDiv>  
  )
}

SignUp.getLayout = (page) => {
  return(
    <Layout title = {'Tris - Sign up'}>
      {page}
    </Layout>
  )
}

export default SignUp
