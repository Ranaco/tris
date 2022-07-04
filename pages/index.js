import getWindowDimensions from '../lib/device-viewport.js'
import ProfileCard from '../components/profile_card'
import FollowingListTile from '../components/following_list_tile'
import { Show, Hide, Flex, Square, Box } from '@chakra-ui/react'
import ProfileImage from '../public/images/profile.png'
import { AppState } from './_app.js'
import WallUrl from '../public/images/landscape.png'
import dummy_data from '../lib/dummy_data'
import CreatePostTile from '../components/create_post_tile.js'
import { useState, useContext } from 'react'
import PostTile from '../components/post_tile'
import DummyPostData from '../lib/dummy_post_data'
import TrendForYou from '../components/trend_for_you'
import TrendingData from '../lib/dummy_trending_data'

const Homepage = () => {

  const [post, setPost] = useState("")
  const windowDimension = getWindowDimensions()

  const handleChange = (event) => {
    setPost(event.target.value)
  }
  const [state, setState] = useContext(AppState)

  return (
    <Flex
    backgroundImage = 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)'
    backgroundPosition = "center"
    color='white' 
    mt="70px"
    gap="20px"
    w="95%"
    flexDirection="row">
      <Show breakpoint='(min-height: 750px)'>
        <Hide breakpoint='(max-width: 1090px)'>
          <Box w='30%' gap="10px" overflowY = 'scroll' h="90vh" flexBasis="60%" display={'flex'} alignItems={'start'} justifyContent={'start'} flexDirection="column">
            <ProfileCard
              profileUrl={ProfileImage}
              wallUrl={WallUrl}
              name="Vishal_kr7"
              userName="vishal_002"
              following="200"
              followers="5000"
              bio="Hello there this is Vishal"
            />
            {state.account}
            <FollowingListTile followers={dummy_data} />
          </Box>
        </Hide>
      </Show>
      <Square display={'flex'} alignItems={'start'} gap = "10px" overflowY = "scroll" justifyContent={'start'} flexDirection="column" h="90vh" flex='1' flexBasis="110%">
        <CreatePostTile
         onCameraClick={() => console.log("hello there")} 
         onListClick={() => console.log("hello List there")}
          onGalleryClick={() => console.log("hello Gallery there")}
           onScheduleClick={() => console.log("hello Schedule there")} 
           onChange={handleChange} 
           value={post} 
           profileUrl={ProfileImage} />
        <Box flexDirection = "column" w = "100%" gap = "10px" display = "flex" alignItems = 'center' justifyContent = "center">
          { 
            DummyPostData.map((post, index) => {
              return <PostTile key={index} post={post} />
            })
          }
        </Box>
    </Square>
      <Show breakpoint='(min-height: 750px)'>
        <Hide breakpoint='(max-width: 1090px)'>
      <Box w="30vw" flexBasis="70%">
        <TrendForYou data = { TrendingData } />
      </Box>
        </Hide>
      </Show>
    </Flex>
  )
}

export default Homepage
