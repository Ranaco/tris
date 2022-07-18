import {
  Box,
  useMediaQuery,
  Container,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
interface BioProps {
  bio: string
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')

  return (
    <Box
      m='5px'
      borderRadius={'20px'}
      color='white'
      p='25px'
      mr={isLargerThan1200 ? 'auto' : undefined}
      mt='20px'
      textAlign={'center'}
      border='4px dotted grey'
    >
      {bio}
    </Box>
  )
}

export default Bio 
