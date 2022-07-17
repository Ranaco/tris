import {
  Box,
  Container,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
interface BioProps {
  bio: string
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <Box color='white' w='100%' h='200px' mt='20px' textAlign={'center'} bg='red'>
      {bio}
    </Box>
  )
}

export default Bio 
