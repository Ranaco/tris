import {
  Box,
  Container,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import Image from 'next/image'

interface MyPostProps {
  title: string,
  url: string,
  likes: string,
  comments: string,
}

const MyPost: React.FC<MyPostProps> = ({ title, url, likes, comments }) => {

  return (
    <Box h='500px' minW='300px' w='33%'>
      <Image src={url} height='60%' width='100%' />
      <Container
        w='100%'
        h='40%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column' >
        <Text>
          {title}
        </Text>
      </Container>
    </Box>
  )

}

export default MyPost
