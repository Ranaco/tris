import {
  Box,
  Container,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'

interface MyPostProps {
  title: string,
  url: string,
  likes: string,
  comments: string,
}

const MyPost: React.FC<MyPostProps> = ({ title, url, likes, comments }) => {

  const rawUrl = url.replace('ipfs://', '')
  const parsedUrl = 'https://ipfs.io/ipfs/' + rawUrl

  return (
    <Box
      _hover={{
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.4)',
        transform: 'translateY(-5px)',
      }}
      p='20px'
      minW='300px'
      w='100%'
      borderRadius='20px'
      mb='20px'
      bg='rgba(27, 39, 48, 0.3)'
      css={{ backdropFilter: 'blur(20px)' }}>
      <Image src={parsedUrl} style={{ borderRadius: "20px" }} width='400px' height={'250px'} />
      <Container
        pb='20px'
        w='100%'
        h='40%'
        borderRadius='20px'
        display='flex'
        alignItems='start'
        justifyContent='center'
        flexDirection='column' >
        <Text>
          {title}
        </Text>
        <Container mr='auto' gap='20px' pt='20px' display='flex' >
          <AiOutlineHeart size={'25px'} style={{ cursor: 'pointer' }} />{likes}
          <FaRegComment size={'23px'} style={{ cursor: 'pointer' }} />{comments}
        </Container>
      </Container>
    </Box>
  )

}

export default MyPost
