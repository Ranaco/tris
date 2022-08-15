
import { StyledDiv } from '../lib/custom-component'
import { Box } from '@chakra-ui/react'
import * as React from  'react'

interface Nft {
  url: String,
  title: String,
  price: String,
  basePrice: String,
  onSold: any,
  owner: any,
}

const NftCard: React.FC<Nft> = ({ url, title, price, basePrice, onSold, owner }) => {
  return (
    <StyledDiv
        borderRadius={'20px'}
        bg="rgba(27, 39, 48, 0.5)"
        css={{ backdropFilter: 'blur(30px)' }}>
      <Box h='490px' w='420px'>
          {title} 
      </Box>
    </StyledDiv>
  )
}

export default NftCard
