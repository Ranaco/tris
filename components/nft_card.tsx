
import { StyledDiv } from '../lib/custom-component'
import { Box, Text, Button } from '@chakra-ui/react'
import * as React from 'react'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { AppState } from '../pages/_app'
import { parseUserData } from '../lib/ipfs-storage'

interface Nft {
  url: string,
  title: string,
  price: string,
  basePrice: string,
  onSold: any,
  owner: any,
  id: any
}

const NftCard: React.FC<Nft> = ({ url, title, id, price, basePrice, onSold, owner }) => {

  const rawUrl = url.replace('ipfs://', '')
  const parsedUrl = 'https://ipfs.io/ipfs/' + rawUrl
  const [isLoaded, setIsLoaded] = useState(false)
  const { state } = useContext(AppState)
  const [currentUser, setCurrentUser] = useState({
    profileUrl: '',
    name: '',
    userName: '',
    address: '0x0'
  })

  useEffect(() => {
    loadNft()
  }, [state.account])

  const loadNft = async () => {
    if (state.account !== "0x0") {
      getUser().then((val) => {
        if (val) {
          setIsLoaded(val)
        }
      })
    }
  }

  const getUser = async () => {
    const currUser = await state.UserContract.methods.getUserData(owner).call()
    const parsedUser = await parseUserData({ User: currUser, posts: [] })
    setCurrentUser(parsedUser)
    return true
  }

  const sellPost = (e: any) => {
    e.preventDefault();
    onSold({ owner: owner, postId: id  })
  }

  return !isLoaded ?
    <StyledDiv></StyledDiv> :
    (
      <StyledDiv
        borderRadius={'20px'}
        bg="rgba(27, 39, 48, 0.5)"
        css={{ backdropFilter: 'blur(30px)' }}>
        <Box h='390px' w='100%' position={'relative'}>
          <Image src={parsedUrl} style={{ borderRadius: '20px 20px 0px 0px' }} layout='fill' alt={title} />
        </Box>
        <StyledDiv h='0'>
          <StyledDiv h='100px' borderRadius={'0px 0px 20px 20px'} w='100%' bg='rgba(27, 39, 48, 0.5)'
            css={{ backdropFilter: 'blur(20px)' }}
            display='flex'
            alignItems='center'
            justifyContent={'start'}
            pl='20px'
          >
            <Image src={currentUser.profileUrl} alt={currentUser.name} style={{ borderRadius: '100%' }} height='60px' width='60px' />
            <StyledDiv
              w='100%'
              pt='20px'
              gap='5px'
              display={'flex'}
              flexDirection='column'
              alignItems={'start'}
              h='100px'>
              < Text pl='10px' w = '90%'  overflow={'hidden'}  fontSize={'1.3em'} fontWeight='bold' textAlign={'start'}>
                {title}
              </Text>
              <Text pl='10px' color={'grey'} textAlign={'start'}>
                {basePrice} TRI
              </Text>
            </StyledDiv>
            <Button ml='auto' onClick={sellPost} mr='30px' bg={'rgba(79, 79, 90, 0.5)'} >
              {price} TRI
            </Button>
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>
    )
}

export default NftCard
