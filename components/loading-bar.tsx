import { StyledDiv } from '../lib/custom-component'
import * as React from 'react'
import { Text } from '@chakra-ui/react'

interface LoadingBarProps {
  uploaded: string
}

const LoadingBar: React.FC<LoadingBarProps> = ({ uploaded }) => {

  return (
    <StyledDiv w='60%' h='40px' bg={uploaded == "File parsing started." || "File selected." ? 'red' : uploaded == 'Uploading to IPFS.' ? 'orange' : uploaded == 'No file' ? 'textGrey' : 'green'} alignItems='center' display='flex' justifyContent={'center'} borderRadius={'10px'}>
      <Text>
        {uploaded}
      </Text>
    </StyledDiv>
  )
}


export default LoadingBar
