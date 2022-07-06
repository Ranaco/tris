import { useContext, useState, useEffect } from 'react'
import { AppState } from '../_app'
import { StyledDiv } from '../../lib/custom-component'
import Layout from '../../components/layouts/secondary'
import { Input, Textarea, Hide, Box, Flex, Container, Text } from '@chakra-ui/react'
import TrisLogo from '../../components/logo'

const InputField = ({ name, value, onChange, title, props, width, placeholder, minWidth, size, isBio }) => {
  return(
   <Box display = 'flex' justifyContent = 'start' width = {width ?? '50%'} bg = 'rgba(216, 222, 233, 0.2)'  minWidth = {minWidth ?? '300px'} borderRadius = '15px' flexDirection = 'column' css = {{ backdropFilter: 'blur(20px)' }}>
      <Text fontSize = '1.1em' color = 'white' pl = '10px'>
        {title}
      </Text>
      {
        isBio 
        ?      <Textarea maxLength={'300'} fontSize = '1.4em' name = {name} style = {{ ...props }} value = {value} minHeight = {size} onChange = {onChange} display={'inline-block'} variant = 'unstyled' placeholder = {placeholder ?? "...."} size = {size} pl = '10px'/>
        :       <Input fontSize = '1.4em' name = {name} style = {{ ...props }} value = {value} onChange = {onChange} display={'inline-block'} variant = 'unstyled' placeholder = {placeholder ?? "...."} size = {size} pl = '10px'/>

      }
    </Box> 
  )
}

const MastHead = () => {
  return(
    <StyledDiv w = '100%' h = '20%' mt = '10px' display = 'flex' alignItems = 'center' justifyContent = 'start'>
      <TrisLogo mt = '45px'/> 
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

  const [ data, setData ] = useState({
    firstName: '',
    lastName: '',
    profilePic: undefined,
    email: '',
    bio: '',
    userName: ''
  })

  const handleChange = (e) => {
    setData((val) => {
      return{
        ...val,
        [e.target.name]: e.target.value,
      }
    })
  } 

  return(
    <StyledDiv h = '100vh' w = '100%' display = 'flex' alignItems = 'center' justifyContent = 'center' >
     <Box h = '90%' display = 'flex' flexDirection = 'column' alignItems = 'start' justifyContent = 'start' w = '95%' borderRadius = '20px' css = {{ backdropFilter: 'blur(20px)' }}>
      <MastHead/>
        <Flex h = '70%' w = '100%' mt = 'auto'>
          <Box h = '100%' w = '50%' p = '20px' display = 'flex' flexDirection = 'column' alignItems = 'center' justifyContent = 'center' gap = '35px'>
            <Flex w = '100%' justifyContent = 'space-evenly'>
               <InputField  title = 'First name' name = 'firstName' value = {data.firstName} onChange = {handleChange} placeholder = 'First name' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
               <InputField  title = 'Last name' name = 'lastName' value = {data.lastName} onChange = {handleChange} placeholder = 'Last name' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
            </Flex>
            <Flex w = '100%' justifyContent = 'space-evenly'>
               <InputField  title = 'Username' name = 'userName' value = {data.userName} onChange = {handleChange} placeholder = 'Username' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
               <InputField  title = 'Email' name = 'email' value = {data.email} onChange = {handleChange} placeholder = 'Email' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
            </Flex>
              <InputField  title = 'Bio' name = 'bio' value = {data.bio} onChange = {handleChange} placeholder = 'Bio' props = {{ height: '50px' }} isBio = {true} size = '150px' width = '93%' minWidth = '300px'/>
          </Box>
          <Box h = '100%' w = '50%' >

         </Box>
        </Flex>
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
