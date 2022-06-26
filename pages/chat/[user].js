import { useRouter } from 'next/router'
import Layout from '../../components/layouts/secondary'
import { StyledDiv } from '../../lib/custom-component'
import { Flex, Square, Show, Hide, Box, Text } from '@chakra-ui/react'
import BackgroundImage from '../../public/images/background.jpg'
import Image from 'next/image'
import { useState } from 'react'
import ProfileImage from '../../public/images/profile.png'
import { FiVideo, FiPhoneCall } from 'react-icons/fi'
import { IoIosPeople } from 'react-icons/io'
import { BsFolder2Open } from 'react-icons/bs'

const User = () => {
  const router = useRouter()
  const { user } = router.query
  const [ userData, setUserData] = useState({
    name: "Vishal_kr7",
    userName: "vishal_002",
    profileUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
    friends: [
      {
        name: "Vishal_kr7",
        userName: "vishal_002",
        profileUrl: "https://xsgames.co/randomusers/avatar.php?g=male"
      },
      {
        name: "Vishal_kr7",
        userName: "vishal_002",
        profileUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Vishal_kr7",
        userName: "vishal_002",
        profileUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
    ]
  })

  const UserCard = () => {
    return(
      <Box bg = 'lightGrey' mt = "35%" borderRadius = '0px 20px 20px 20px' h = "30%" w = '100%'>
       <Box display={'flex'} alignItems= 'start'justifyContent={'start'} position = 'relative' top = '-20px' h = '100%'>
       <Box position = 'relative' h = '35%' w = '20%' p = '7px' bg = 'lightGrey' top = '-40px' borderRadius={'full'} >
          <Image src = { userData.profileUrl } height = '100%' width = '100%' alt = 'profile_url' style = {{ borderRadius: '200px' }} />
        </Box>
          <Text position = 'relative' color={'white'} h = '35%' p = '7px' top = '-20px'>
            { userData.name }
          </Text>
       </Box>
      </Box>
    )
  }

  const ChatNavbar = ({ people, name }) => {
    return(
      <Box display = 'flex' alignItems = 'start' justifyContent = 'center'>
         
      </Box>
    )
  }

  const ChatPage = () => {
    return(
      <StyledDiv>
        
      </StyledDiv>
    )
  }

  return(
    <Flex mt = '50px' ml = '2.6%' gap = '10px' w = '95%' >
      <Show breakpoint='(min-height: 750px)'>
        <Hide breakpoint='(max-width: 1090px)'>
          <Box
            borderRadius = '20px'
            w='30%' 
            gap="10px" 
            bg = "textGrey" 
            h="90vh" 
            flexBasis="60%" 
            display={'flex'} 
            alignItems={'center'} 
            justifyContent={'start'} 
            flexDirection="column">
            <UserCard/>
          </Box>
        </Hide>
      </Show>
    <Square 
    display={'flex'} 
    alignItems={'start'} 
    gap = "10px" 
    overflowY = "scroll" 
    justifyContent={'start'} 
    flexDirection="column" 
    h="90vh"
    borderRadius = "20px"
    backgroundPosition = "center"
    backgroundImage = 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)' 
    flex='1' 
    flexBasis="110%">
       
    </Square>
      <Show breakpoint='(min-height: 750px)'>
        <Hide breakpoint='(max-width: 1090px)'>
      <Box bg = 'textGrey' w="30vw" borderRadius = '20px' flexBasis="70%">
      </Box>
        </Hide>
      </Show>
    </Flex>
  )
}


User.getLayout = (page) => {
  const router = useRouter()
  const { user } = router.query
  return(
    <Layout title = {user}>
      { page }
    </Layout>
  )
}

export default  User
