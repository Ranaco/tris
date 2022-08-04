import { ButtonGroup, Button, Container, Box, Text } from "@chakra-ui/react";
import { StyledButton, StyledDiv, StyledInput } from "../lib/custom-component";
import VerfiedBadge from "../public/images/verified.png";
import Image from "next/image";
import { RiHeart2Fill } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import getWindowDimensions from "../lib/device-viewport";
import * as React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import { AppState } from '../pages/_app'
import { parseUserData } from "../lib/ipfs-storage";

const CustomButton = ({ onClick, icon, buttonText }) => {
  const windowDimension = getWindowDimensions();

  return (
    <Button
      bg={windowDimension.width < "605" ? "textGrey" : "rgba(40, 52, 62, 0.5)"}
      h="50px"
      css={{ backdropFilter: 'blur(30px)' }}
      p={"10px"}
      leftIcon={icon}
      borderRadius="15px"
      _hover={{
        color: "white",
        boxShadow: "0px 5px 25px rgba(0,0,0,0.5)",
      }}
      onClick={onClick}
      px="10px"
      py="5px"
      w="100%"
    >
      {buttonText}
    </Button>
  );
};

interface PostTileInterface {
  post: any,
}

const PostTile: React.FC<PostTileInterface> = ({ post, }) => {

  const { state } = useContext(AppState)
  const [currentUser, setCurrentUser] = useState({
    profileUrl: '',
    name: '',
    userName: '',
  })
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    loadPage()
  }, [])

  const rawUrl = post.post.replace("ipfs://", '')
  const url = "https://ipfs.io/ipfs/" + rawUrl

  const loadPage = async () => {
    if (state.account !== "0x0") {
      console.log("This is the state, ", state)
      await getUser()
      setIsLoaded(true)
    }

  }
  const getUser = async () => {
    const currUser = await state.UserContract.methods.getUserData(post.seller).call()
    const parsedUser = await parseUserData({ User: currUser, posts: [] })
    setCurrentUser(parsedUser)
    console.log("This is the post from each post :: ", post)
    console.log("This is the parsed user :: ", parsedUser)
    console.log("This  is the url from each post data :: ", url)
  }

  const [commentOn, setCommentOn] = useState(false)
  const commentClicked = (e: any) => {
    e.preventDefault()
    setCommentOn(false)
  }
  const [comment, setComment] = useState('')
  return !isLoaded ?
    <Box></Box>
    :
    (
      <StyledDiv
        minH="200px"
        bg="rgba(27, 39, 48, 0.5)"
        css={{ backdropFilter: 'blur(30px)' }}
        w="100%"
        borderRadius="20px"
        display="flex"
        alignItems="start"
        justifyContent="start"
        flexDirection="column"
      >
        <Box
          maxH="100%"
          h="100px"
          w="100%"
          display="flex"
          alignItems="start"
          justifyContent="start"
          flexDirection="column"
        >
          <Box
            display={"flex"}
            flexDirection="row"
            alignItems={"center"}
            justifyContent="center"
          >
            <Box m="15px" ml="20px" h="60px" w="60px" borderRadius="100px">
              <Image
                src={currentUser.profileUrl}
                alt={currentUser.name}
                style={{ borderRadius: "200px" }}
                layout="responsive"
                width="60px"
                height="60px"
              />
            </Box>
            <Box
              alignItems="start"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              gap="5px"
            >
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                justifyContent="center"
              >
                <Text fontSize="20px">{currentUser.name}</Text>
                <Box width="20px" height="20px">
                  <Image src={VerfiedBadge} alt="verified" />
                </Box>
                <Text color="grey">@{currentUser.userName}</Text>
              </Box>
              <Text color="grey" fontSize="14px">
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
        </Box>
        <Box
          w="100%"
          pl="11%"
          flexDirection="column"
          display="flex"
          alignItems="start"
          justifyContent="start"
        >
          <Text fontSize="1.3em">{post.title}</Text>
          <Box w="87%" h="20%" pb="30px">
            <Image
              style={{ borderRadius: "20px" }}
              src={url}
              alt={post.title}
              layout="responsive"
              width="100%"
              height="75%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={"row"}
          pt="20px"
          color="grey"
          m={0}
          w="77%"
          ml="11%"
          mr="11%w"
        >
          {post.likes} likes
          <StyledDiv style={{ flex: "1" }} />
          {post.commentsCount} comments
        </Box>
        <ButtonGroup w="100%" gap="30px" pl="11%" pr="11%" pt="4px" pb="30px">
          <CustomButton
            onClick={() => {
            }}
            icon={<RiHeart2Fill size="20px" />}
            buttonText="Like"
          />
          <CustomButton
            onClick={() => { }}
            icon={<FaRetweet size="20px" />}
            buttonText="Retweet"
          />
          <CustomButton
            onClick={() => {
              setCommentOn((val) => !val)
              setComment('')
            }}
            icon={<FaRegCommentDots size="20px" />}
            buttonText="Comment"
          />
        </ButtonGroup>
        <AnimatePresence>
          {
            commentOn &&
            (
              <StyledDiv
                gap='10px'
                initial={{
                  opacity: 0,
                  height: '0px'
                }}
                animate={{
                  opacity: 1,
                  height: '50px'
                }}
                exit={{
                  opacity: 0,
                  height: '0px'
                }}

                w='100%' display={'flex'} alignItems='center' justifyContent='center'>
                <StyledInput
                  initial={{
                    opacity: 0,
                    height: '0px'
                  }}
                  animate={{
                    opacity: 1,
                    height: '50px'
                  }}
                  exit={{
                    opacity: 0,
                    height: '0px'
                  }}
                  h='50px'
                  css={{

                  }}
                  pl='10px'
                  mb='30px'
                  bg='blackAlpha.200'
                  border={'none'}
                  placeholder='...'
                  w="67%"
                  borderRadius={'5px'}
                  alignSelf={'center'}
                  pt='10px'
                  fontSize={'1.3em'}
                  _placeholder={{
                    fontSize: '30px',
                  }}
                  onChange={(e) => setComment(e.target.value)}
                />
                <StyledButton
                  textAlign={'center'}
                  onClick={() => {
                    console.log(post.postId)
                    console.log(comment)
                  }}
                  border={'none'}
                  mb='30px'
                  w='80px'
                  bg='blackAlpha.300'
                  initial={{
                    opacity: 0,
                    height: '0px'
                  }}
                  animate={{
                    opacity: 1,
                    height: '50px'
                  }}
                  exit={{
                    opacity: 0,
                    height: '0px'
                  }}

                >
                  Post
                </StyledButton>
              </StyledDiv>
            )
          }
        </AnimatePresence >
      </StyledDiv >
    );
};

export default PostTile;
