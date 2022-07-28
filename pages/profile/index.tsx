import {
  Box,
  Text,
  Container
} from '@chakra-ui/react'
import { StyledDiv } from '../../lib/custom-component'
import { useEffect, useContext, useState } from 'react'
import Layout from '../../components/layouts/secondary'
import { AppState } from '../_app'
import Image from 'next/image'

const Profile = () => {

  const { state } = useContext(AppState)
  const [pageIsLoaded, setPageIsLoaded] = useState(false)

  const loadPage = () => {
    if (state.account !== '0x0') {
      setPageIsLoaded(true)
    }
  }

  useEffect(() => {
    loadPage()
  }, state.User)

  return !pageIsLoaded ?
    <Box></Box> :
    (
      <StyledDiv
        display='flex'
        alignItems={'center'}
        justifyContent={'center'}
        w='100%'
        h='100%'
        p='20px'
        gap='20px'
      >
        <StyledDiv bg="rgba(27, 39, 48, 0.5)" borderRadius={'20px'} flexBasis={'30%'} h='100%' css={{ backdropFilter: 'blur(30px)' }}>
          <Box>
            <StyledDiv
              w='100%'
              display={'flex'}
              justifyContent='center'
              pt='30px'
              flexDirection='column'
              alignItems={'center'}>
              <Image src={state.User.profileUrl} height='200px' width={'200px'} style={{ borderRadius: '100%' }} />
              <StyledDiv>
                <Box
                  w='100%'
                  display='flex'
                  alignItems='center'
                  justifyContent={'center'}
                  flexDirection='column'
                  gap='10px'
                >
                  <Text fontSize='2em'>
                    {state.User.name}
                  </Text>
                  <Text fontSize='1.5em' color='grey'>
                    @{state.User.userName}
                  </Text>
                  <Text fontSize={'1.5em'}>
                    {state.User.email}
                  </Text>
                  <Text fontSize='1.5em' pt='30px' >
                    {state.User.bio}
                  </Text>
                </Box>
              </StyledDiv>
            </StyledDiv>
          </Box>
        </StyledDiv>
        <StyledDiv bg="rgba(27, 39, 48, 0.5)" flexBasis={'70%'} borderRadius='10px' h='100%' css={{ backdropFilter: 'blur(30px)' }}>
        </StyledDiv>
      </StyledDiv>
    )
}

Profile.getLayout = page => (<Layout title={"Profile"}>{page}</Layout>)

export default Profile
