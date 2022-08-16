
import { StyledDiv } from '../lib/custom-component'
import { Box } from '@chakra-ui/react'
import * as React from 'react'
import Image from 'next/image'

interface Nft {
  url: string,
  title: string,
  price: string,
  basePrice: string,
  onSold: any,
  owner: any,
}

const NftCard: React.FC<Nft> = ({ url, title, price, basePrice, onSold, owner }) => {

  const rawUrl = url.replace('ipfs://', '')
  const parsedUrl = 'https://ipfs.io/ipfs/' + rawUrl

  return (
    <StyledDiv
      borderRadius={'20px'}
      bg="rgba(27, 39, 48, 0.5)"
      css={{ backdropFilter: 'blur(30px)' }}>
      <Box h='390px' w='47vh' position={'relative'}>
        <Image src={parsedUrl} style={{ borderRadius: '20px 20px 0px 0px' }} layout='fill' alt={'dragon'} />
      </Box>
      <StyledDiv h='0'>
        <StyledDiv h='100px' borderRadius={'0px 0px 20px 20px'} w='100%' bg='rgba(27, 39, 48, 0.5)'
          css={{ backdropFilter: 'blur(20px)' }}
        >

        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}

export default NftCard
