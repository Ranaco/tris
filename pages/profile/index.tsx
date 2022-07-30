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
import { FollowPanel } from '../../components/profile_card'
import MyPost from '../../components/my_post'

const Profile = () => {

  const { state } = useContext(AppState)
  const [pageIsLoaded, setPageIsLoaded] = useState(false)
  const [posts, setPosts] = useState([
    {
      post: 'https://google.com/',
      likes: '39',
      title: 'nothing phone',
      commentsCount: '20'
    }
  ])
  const loadPage = () => {
    if (state.account !== '0x0') {
      setPageIsLoaded(true)
    }
  }

  useEffect(() => {
    loadPage()
  }, [state.User])

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
        <StyledDiv
          overflowY={'scroll'}
          bg="rgba(27, 39, 48, 0.5)"
          borderRadius={'20px'}
          flexBasis={'30%'} h='100%'
          css={{ backdropFilter: 'blur(30px)' }}>
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
                  <Text fontSize='1.5em' pt='30px' >
                    {state.User.bio}
                  </Text>
                </Box>
              </StyledDiv>
              <FollowPanel followers={state.User.followersCount} following={state.User.followingCount} props={{ marginTop: '8%', height: '130px', fontSize: '1.5em' }} />
              <Text mt='30px' pb='20px' fontSize={'1.5em'}>
                Email: {state.User.email}
              </Text>
            </StyledDiv>
          </Box>
        </StyledDiv>
        <StyledDiv
          bg="rgba(27, 39, 48, 0.5)"
          flexBasis={'70%'}
          borderRadius='10px'
          h='100%'
          display={'flex'}
          alignItems='center'
          justifyContent='start'
          flexDirection={'column'}
          css={{ backdropFilter: 'blur(30px)' }}>
          {posts.map((post, index) => {

          })}
        </StyledDiv>
      </StyledDiv>
    )
}

Profile.getLayout = (page: any) => (<Layout title={"Profile"}>{page}</Layout>)

export default Profile
