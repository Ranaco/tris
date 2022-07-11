import { ButtonGroup, Button, Container, Box, Text } from "@chakra-ui/react";
import { StyledDiv } from "../lib/custom-component";
import VerfiedBadge from "../public/images/verified.png";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import getWindowDimensions from "../lib/device-viewport";
import * as React from 'react'

const CustomButton = ({ onClick, icon, buttonText }) => {
  const windowDimension = getWindowDimensions();

  return (
    <Button
      bg={windowDimension.width < "605" ? "textGrey" : "lightGrey"}
      h="50px"
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
  key: any
}

const PostTile: React.FC<PostTileInterface> = ({ post, key }) => {
  return (
    <StyledDiv
      key={key}
      minH="200px"
      bg="textGrey"
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
              src={post.profileUrl}
              alt={post.name}
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
              <Text fontSize="20px">{post.name}</Text>
              <Box width="20px" height="20px">
                <Image src={VerfiedBadge} alt="verified" />
              </Box>
              <Text color="grey">@{post.userName}</Text>
            </Box>
            <Text color="grey" fontSize="14px">
              {post.postTime}
            </Text>
          </Box>
        </Box>
        <Box alignSelf={"end"}>
          <BsThreeDots size="20px" />
        </Box>
      </Box>
      <Box>
        <Container>
          <Text>{post.postText}</Text>
        </Container>
      </Box>
      <Box
        w="100%"
        pl="11%"
        flexDirection="column"
        display="flex"
        alignItems="start"
        justifyContent="start"
      >
        <Text fontSize="1.3em">{post.post}</Text>
        {post.postType === "image" ? (
          <Box w="87%" h="20%" pb="30px">
            <Image
              style={{ borderRadius: "20px" }}
              src={post.postUrl}
              alt={post.name}
              layout="responsive"
              width="100%"
              height="80%"
            />
          </Box>
        ) : undefined}
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
        {post.comments} comments
      </Box>
      <ButtonGroup w="100%" gap="30px" pl="11%" pr="11%" pt="4px" pb="30px">
        <CustomButton
          onClick={() => { }}
          icon={<RiHeart2Fill size="20px" />}
          buttonText="Like"
        />
        <CustomButton
          onClick={() => { }}
          icon={<FaRetweet size="20px" />}
          buttonText="Retweet"
        />
        <CustomButton
          onClick={() => { }}
          icon={<FaRegCommentDots size="20px" />}
          buttonText="Comment"
        />
      </ButtonGroup>
    </StyledDiv>
  );
};

export default PostTile;
