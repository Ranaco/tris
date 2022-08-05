import {
  Box,
  Text,
  Button,
  SimpleGrid
} from '@chakra-ui/react'
import { StyledDiv } from '../../lib/custom-component'
import { useEffect, useContext, useState } from 'react'
import Layout from '../../components/layouts/secondary'
import { AppState } from '../_app'
import Image from 'next/image'
import { FollowPanel } from '../../components/profile_card'
import MyPost from '../../components/my_post'
import { useRouter } from 'next/router'
import getWindowDimensions from '../../lib/device-viewport'

const Profile = () => {

  const size = getWindowDimensions()
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
      setPosts(state.User.posts)
    }
  }

  const router = useRouter()

  useEffect(() => {
    loadPage()
  }, [state.User])

  const logOut = async () => {
    const val = await state.disconnectWallet()
    if (val) {
      window.localStorage.setItem('isAuthenticated', 'false')
      router.replace('/login').then((val) => {
        location.reload()
      })
    }
  }


  return !pageIsLoaded ?
    <Box></Box> :
    (
      <StyledDiv
        display='flex'
        flexDirection={size.width < 950 ? 'column' : 'row'}
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
          flexBasis={size.width < 950 ? undefined : '30%'}
          width={size.width < 950 ? '100%' : undefined}
          minH='400px'
          h='100%'
          css={{ backdropFilter: 'blur(30px)' }}>
          <Box flex='1'>
            <StyledDiv
              w='100%'
              display={'flex'}
              pt='30px'
              justifyContent='center'
              flexDirection='column'
              alignItems={'center'}>
              <Image src={state.User.profileUrl} height='120%' width={'120%'} style={{ borderRadius: '100%' }} />
              <StyledDiv>
                <Box
                  w='100%'
                  display='flex'
                  textAlign='center'
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
              <FollowPanel followers={state.User.followersCount} following={state.User.followingCount} props={{ marginTop: '8%', height: '130px', fontSize: '1.5em', width: '100%' }} />
              <Text mt='30px' pb='20px' fontSize={'1.5em'}>
                Email: {state.User.email}
              </Text>
            </StyledDiv>
          </Box>
          <StyledDiv pb='30px' position='relative' bottom='-30%' pr='30px' w='100%' display='flex' alignItems='center' justifyContent='end' h='70px'>
            <Button onClick={logOut}> Log out</Button>
          </StyledDiv>
        </StyledDiv>
        <StyledDiv
          bg="rgba(27, 39, 48, 0.5)"
          flexBasis={'70%'}
          borderRadius='10px'
          h='100%'
          overflowY='scroll'
          display={'flex'}
          alignItems='center'
          justifyContent='start'
          flexDirection={'column'}
          css={{ backdropFilter: 'blur(30px)' }}>
          <Box flex='1'>
            <SimpleGrid columns={[1, 1, 2]} mt='30px' gap={12}>
              {
                posts.map((post, index) => {
                  return (<MyPost url={post.post} likes={post.likes} title={post.title} comments={post.commentsCount} key={index} />)
                })
              }
            </SimpleGrid>
          </Box>
        </StyledDiv>
      </StyledDiv>
    )
}

Profile.getLayout = (page: any) => (<Layout title={"Profile"}>{page}</Layout>)

export default Profile
