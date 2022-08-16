import { StyledDiv } from '../../lib/custom-component'
import { SimpleGrid, Text } from '@chakra-ui/react'
import mix from '../../public/images/mix.png'
import Image from 'next/image'
import NftCard from '../../components/nft_card'
import { useState, useEffect, useContext } from 'react'
import { AppState } from '../_app'

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
        display='flex'
        flexDirection={'column'}
        alignItems='start'
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
          color='grey'
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

  const { state } = useContext(AppState)
  const [nft, setNft] = useState([])
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    loadState()
  }, [state.account, state.posts])

  const loadState = () => {
    if(state.account !== "0x0"){
      setIsPageLoaded(true)
    } 
    loadNft()
  }

  const loadNft = async () => {
    
    const currNfts = state.posts.filter(checkIsNft)

    console.log(currNfts)
    setNft(currNfts) 
  }

  const checkIsNft = (nft: any) =>  {
    return nft.isNft == true && nft.isForSale == true
  }

  return !isPageLoaded ?
  <StyledDiv></StyledDiv> :
  (
    <StyledDiv
      w='100%'
      overflowY='scroll'
      pt='100px'
      flexDirection={'column'}
      display='flex'
      gap='30px'
      alignItems={'center'}
      justifyContent='start'
      pb='30px'
    >
      <StyledDiv
        w='98%'
        borderRadius={'20px'}
        minH={'500px'}
        bg="rgba(27, 39, 48, 0.5)"
        css={{ backdropFilter: 'blur(30px)' }}>
        <CustomHeader />
      </StyledDiv>
      <SimpleGrid pt = '60px' columns={[1, 1, 3]} rowGap='140px' gap='80px' >
       {
          nft.map((n) =>  {
            return <NftCard
              title={n.title} 
              url={n.post}
              owner={n.seller}
              price={n.priceByOwner}  
              basePrice={n.basePrice}
              onSold={n.onSold}
              key={n.postId}
              />
          })
        } 
      </SimpleGrid>
    </StyledDiv>
  )
}

export default Marketplace
