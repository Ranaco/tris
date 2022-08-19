import { StyledDiv } from '../../lib/custom-component'
import { SimpleGrid, Text, useToast } from '@chakra-ui/react'
import mix from '../../public/images/mix.png'
import { ethers } from 'ethers'
import Image from 'next/image'
import NftCard from '../../components/nft_card'
import { useState, useEffect, useContext } from 'react'
import { AppState } from '../_app'
import getWindowDimensions from '../../lib/device-viewport' 

const CustomHeader = () => {
  
  const size = getWindowDimensions()

  return (
    <StyledDiv
      m='0'
      borderRadius={'20px'}
      display={'flex'}
      flexDirection={size.width < 1270 ? 'column' : 'row'}
      justifyContent={'space-between'}
      h={size.width < 1270 ? '800px' : '100%'}
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
      <StyledDiv m='0' h='100%' position={'relative'} w={size.width < 1270 ? '100%' : '45%'}>
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
  const toast = useToast()
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
    setNft(currNfts) 
  }

  const checkIsNft = (nft: any) =>  {
    return nft.isNft == true && nft.isForSale == true
  }

  const onSold = ( { postId, owner,  } ) => {
    console.log("These are the details, owner :: ", owner, " postId :: ", postId, " buyer :: ", state.account)
    const filteredNfts = nft.map((n) => {
      if(n.postId == postId){
        return n
      }
    })
    const currNft = filteredNfts.filter((nft) => { return nft !== undefined})[0]
    if(!currNft.postIsBought){
        state.UserContract.methods.buyPost(owner, postId, state.account).send({from: state.account, value: ethers.utils.parseEther(`${currNft.priceByOwner/1000}`) }).on('receipt', (rec) => {
        toast({
          variant: 'subtle',
          title: 'Post bought',
          description: `Check the transaction https://mumbai.polygonscan.com/address/${rec.transactionHash}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setTimeout(() => {
          location.reload()
        }, 5000) 
      })
    } 
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
      <SimpleGrid pt = '60px' mb = '60px' columns={[1, 1, 3]} rowGap='140px' columnGap='80px' >
       {
          nft.map((n) =>  {
            return <NftCard
              title={n.title} 
              url={n.post}
              id={n.postId}
              owner={n.seller}
              price={n.priceByOwner}  
              basePrice={n.basePrice}
              onSold={onSold}
              key={n.postId}
              />
          })
        } 
      </SimpleGrid>
    </StyledDiv>
  )
}

export default Marketplace
