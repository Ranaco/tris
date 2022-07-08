import { Box, Text, Flex } from '@chakra-ui/react';
import { StyledDiv } from '../../lib/custom-component'
import Layout from '../../components/layouts/secondary'
import  getWindowDimensions from '../../lib/device-viewport' 
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import Image from 'next/image'
import { TbEdit } from 'react-icons/tb'
import { AppState } from '../_app';
import { useEffect, useContext } from 'react';

const UserData = {
  'name': 'Rosy',
  'userName': 'red_velvet8059',
  'bio': "Nothing funny but you should see it once!",
  'email': 'rosy@gmail.com',
}

const BackButton = () => {
  const router = useRouter()
  const handleClick = () => {
    history.go(-1)
  }
  return(
    <Box cursor = 'pointer' bg = 'lightGrey' justifyContent={'center'}  onClick={handleClick}  w = '40px' borderRadius = '10px' m = '10px' h = '40px' display = 'flex' alignItems = 'center' >
      <IoIosArrowBack size = '2.0rem' />
    </Box>
  )
}

const EditableImage = () => {
  return(
    <Box cursor = 'pointer'>
      <Box >
          <Image src = 'https://i.pravatar.cc/300?img=1' style = {{ borderRadius: "100px"}} alt = 'profile' height = '100px' width = '100px' />
      </Box>
      <TbEdit style = {{ position: 'relative', top: '-110px', backgroundColor: 'black', borderRadius: '30px', right: '-80px', height: '30px', width: '30px', padding: '6px' }} onClick={() => window.localStorage.setItem('isAuthenticated', 'false')} size = '20px' color = 'white'/>
    </Box>
  )
}

const Profile = () => {

  const [ state, setState ] = useContext(AppState)

  useEffect(() => {
    const logState = () => {
        console.log("This is the state from Profile :: ", state)
    }  
    logState()
  }, [])
  
  const size = getWindowDimensions()
  const router = useRouter()
  return(
    <StyledDiv
    display = 'flex' 
    alignItems = 'center' 
    justifyContent = 'center'
    w = '100wh'
    h = '100vh'
    >
     <StyledDiv w = '95%' h = '95%' css = {{ backdropFilter: 'blur(20px)'}} borderRadius = '20px' display = 'flex' alignItems = 'center' justifyContent = 'center' position = 'fixed'>
      <Box w = { size.width > '1051' ? '45%' : size.width < '744' ? '90%' : '60%'} h = '80%' bg = 'textGrey' borderRadius = '20px'>
     <Flex alignItems = 'center' w = '100%' justifyContent = 'start'>
          <BackButton />
         <Text fontSize = '2em' marginLeft={'auto'} marginRight='auto'>
            My Account
        </Text>
      </Flex>
      <Box w = '100%' bg = 'blue' h = '30%' pl = '5%'  display = 'flex' alignItems = 'center' justifyContent = 'start'>
      <EditableImage/>
        <Text fontSize = '2em' textAlign = 'center'>
            {UserData.name}
        </Text>
      </Box>
      </Box>
     </StyledDiv>
    </StyledDiv>
  )
}

Profile.getLayout = (page) => <Layout title = {'Profile'}>{page}</Layout>

export default Profile
