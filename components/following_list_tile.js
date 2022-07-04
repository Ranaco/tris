import { Box, Flex, Contianer, Text, Button, } from '@chakra-ui/react'
import { StyledDiv } from '../lib/custom-component'
import Image from 'next/image'
import { CustomDivider } from './navbar'

const FollowerTile = ({ profileUrl, name, userName }) => {
  return(
  <StyledDiv w = "100%"  h = "90px" gap = "5%" display = "flex" alignItems = "center" justifyContent = "start" flexDirection = "row">
      <Box h = "70px" w = "70px" p = "5px">
        <Image style={{ borderRadius: "100px"}} layout='responsive' src = {profileUrl} alt = "profile image" lazyload height = "80px" width = "80px"/>
      </Box>
      <Flex flexDirection = "column" justifyContent = "center" alignItems = "start" h = "80%">
        <Text color = "white" fontSize = "20px">
          { name }
        </Text>
        <Text color = "grey" fontSize = "15px">
        @{ userName }
        </Text>
      </Flex>
      <StyledDiv style = {{ display: "flex"}} />
      <Button borderRadius={"100px"}  color = "black" bgColor = "white">Follow </Button>
  </StyledDiv>
  )
}

const FollowingListTile = ({ followers }) => {
  return(
    <StyledDiv w = "100%"  bg = "textGrey" borderRadius = "20px" p = "20px" display = "flex" alignItems = "center" justifyContent = "center" gap = "10px" flexDirection = "column">
      <Text fontWeight = 'bold' alignSelf={'start'} p = "10px" fontSize = "22px">
        Who is following you
        </Text>
        {followers.map( follower => {
          return(
            <FollowerTile profileUrl = {follower.profileUrl} name = {follower.name} userName = {follower.userName}/>
          )
        }
          )}
      <Text cursor = "pointer" color = "blue" fontSize = "1em" alignSelf = "start">
          Show More
      </Text>
        </StyledDiv>
  )
}

export default FollowingListTile
