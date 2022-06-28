import { Flex, IconButton, Container, Box, Text } from '@chakra-ui/react'
import { StyledDiv } from '../lib/custom-component'
import { IoMdSettings } from 'react-icons/io'

const TrendingTiles = ({ dummyData, props }) => {
  return(
    <StyledDiv pt = '10px'  css = {props} > 
     <Flex flexDirection = 'column'>
      <Text fontSize = '1.3em'>
        {dummyData.hashtag}
      </Text>
      <Text color = 'grey' pl = '5px'  fontSize = '1em'>
        {dummyData.count}k
      </Text>
      </Flex>
    </StyledDiv>
  )
}

const TrendingTileContainer = ({ title, data }) => {
  return(
  <StyledDiv w = '100%' display = 'flex' alignItems = 'start' justifyContent = 'center' h = 'auto' flexDirection = 'column'>
    <Text fontSize = '1.2em' color = 'grey' pt = '20px'>
       {title}
    </Text>
    {
      data.map((item, index) => {
        return(
          <TrendingTiles dummyData = {item} key = {index} props = {{ marginLeft: "10px" }}/>
        )
      })
    }
  <Box w = "70%" bg = 'grey' h = '1px' alignSelf = 'center' mb = '20px' mt = '10px' opacity = '0.5'/>
  </StyledDiv>
    
  )
}

const TrendForYou = ({ data }) => {
  const rowData = data.reduce((rows, key, index) => {
    if (index %2 == 0){
      rows.push([key])
    }
    else{
      rows[rows.length-1].push(key)
    }
    return rows
  }, [])
  return(
    <StyledDiv w = "100%" p = "20px" h = "70%" bg = "textGrey" borderRadius = "20px" overflowY = 'scroll'>
      <Flex flexDirection = 'row' alignItems = 'center' w = '100%' justifyContent = 'space-between'>
        <Text fontSize = "1.5em" fontWeight = 'bold'>Trend For You</Text>
        <Box onClick = {() => console.log('Settings clicked')} cursor = 'pointer'>
          <IoMdSettings fontSize = "1.5em" />
        </Box>   
      </Flex>
      {
        rowData.map((item, index) => {
          return(
            <TrendingTileContainer title = {"Trending Rank :: " + (index + 1)}  data = {item} key = {index}/>
          )
        })
      }
    </StyledDiv>
  )
}

export default TrendForYou
