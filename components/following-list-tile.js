import { Box, Contianer, Text } from '@chakra-ui/react'
import { StyledDiv } from '../lib/custom-component'

const FollowerTile = ({ profileUrl, name, userName }) => {
  return(
  <div>
    </div>
  )
}

const FollowingListTile = ({ followers}) => {
  return(
    <Box display = "flex" alignItems = "center" justifyContent = "center">
      <Text>
        Who is following you
        
      </Text>
    </Box>
  )
}

export default FollowingListTile
