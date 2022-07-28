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
    <Box h='50%' minW='300px' w='100%' border={'2px solid gold'}>
      <Image src={url} width='400px' height={'250px'} />
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
