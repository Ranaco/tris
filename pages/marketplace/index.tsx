import { StyledDiv } from '../../lib/custom-component'
import { SimpleGrid, Text } from '@chakra-ui/react'
import mix from '../../public/images/mix.png'
import Image from 'next/image'
import NftCard from '../../components/nft_card'

const CustomHeader = () => {
  return (
    <StyledDiv
      m='0'
      borderRadius={'20px'}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      h='100%'
    >
      <StyledDiv
        flex='1'
        display = 'flex'
        flexDirection={'column'}
        alignItems = 'start'
        justifyContent={'center'}
        p='60px'
        m='0'
      >
        <Text fontSize={'4em'} fontFamily='Megrim' fontWeight={'bold'}>
          TriStore
        </Text>
        <Text fontSize={'1.5em'} color='grey'>
          The official Tris store
        </Text>
        <Text 
          pt='30px'
          fontSize={'1.8em'} 
          color = 'grey' 
          fontFamily='Shadows Into Light'>
          The one place for all your buying and selling of posts on Tris network.
        </Text>
      </StyledDiv>
      <StyledDiv m='0' h='100%' position={'relative'} w='45%'>
        <Image
          src={mix}
          alt="Group of four photos stacked together"
          layout='fill'
          width={'100vw'}
          style={{ borderRadius: '20px' }} />
      </StyledDiv>
    </StyledDiv>
  )
}

const Marketplace = () => {
  return (
    <StyledDiv
      w='100%'
      h='100%'
      pt='60px'
      gap = '30px'
      flexDirection={'column'}
      display='flex'
      alignItems={'center'}
      justifyContent='start'
    >
      <StyledDiv
        m='20px'
        w='98%'
        borderRadius={'20px'}
        h='45%'
        minH={'500px'}
        bg="rgba(27, 39, 48, 0.5)"
        css={{ backdropFilter: 'blur(30px)' }}>
        <CustomHeader />
      </StyledDiv>
    <SimpleGrid columns={[1, 1, 3]} p = '30px' gap = '80px' >
       <NftCard 
          title={'Nft'} 
          url={'https://ipfs.io/ipfs/bafybeievkw7lmdiwtfi7i4ywjzt2sbcdoptp7aai45y5zzvbqgyat7lfwq/1660293481670.png?imwidth=128'} 
          price = '30'
          basePrice = '40'
          onSold={() =>{console.log("Nft clicked")}}
          owner = "any"
          /> 
     </SimpleGrid> 
    </StyledDiv>
  )
}

export default Marketplace
