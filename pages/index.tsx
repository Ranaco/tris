import ProfileCard from "../components/profile_card";
import FollowingListTile from "../components/following_list_tile";
import { AppState } from "./_app";
import WallUrl from "../public/images/landscape.png";
import CreatePostTile from "../components/create_post_tile";
import React, { useState, useContext, useEffect, useRef } from "react";
import PostTile from "../components/post_tile";
import TrendForYou from "../components/suggested";
import TrendingData from "../lib/dummy_trending_data";
import {
  Show,
  Hide,
  Flex,
  Square,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import CustomDrawer from '../components/drawer'

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleChange = (event: any) => {
    setData((val) => {
      return {
        ...val,
        title: event.target.value
      }
    })
  };

  const [data, setData] = useState({
    title: "",
    post: "",
    description: "",
    priceByOwner: "",
    isForSale: true,
    isNft: true,
  })
  const [pageIsLoaded, setPageIsLoaded] = useState(false)
  const { state, setState } = useContext(AppState);
  const btnRef = useRef()

  useEffect(() => {
    loadPage()
  }, [state.User]);

  const loadPage = () => {
    if (state.account !== "0x0") {
      console.log("This is the state, ", state)
      setPageIsLoaded(true)
    }
  }

  const onLike = async ({ owner, id }) => {
    console.log("Liking post", owner, id)
    await state.UserContract.methods.likePost(owner, id, state.account).send({ from: state.account })
    setState((val) => {
      return {
        ...val,
        posts: val.posts.map((post: any) => {
          if (post.postId === id) {
            return {
              ...post,
              likes: parseInt(post.likes) + 1,
            };
          }
          return post;
        }),
      };
    }
    )

  }
  const onComment = ({ owner, id, comment }) => {
    console.log("This is the comment, ", comment)
    console.log("This is the owner, ", owner)
    console.log("This is the id, ", id)
  }

  return !pageIsLoaded ?
    <Box></Box>
    :
    (
      <Flex
        color="white"
        pt="70.5px"
        ml="auto"
        mr="auto"
        gap="20px"
        w="95%"
        flexDirection="row"
      >
        <CustomDrawer
          isOpen={isOpen}
          setData={setData}
          onClose={onClose}
          finalFocusRef={btnRef}
          data={data}
        />

        <Show breakpoint="(min-height: 750px)">
          <Hide breakpoint="(max-width: 1090px)">
            <Box
              w="30%"
              gap="10px"
              overflowY="scroll"
              h="90vh"
              flexBasis="60%"
              display={"flex"}
              alignItems={"start"}
              justifyContent={"start"}
              flexDirection="column"
            >
              <ProfileCard
                profileUrl={state.User.profileUrl}
                wallUrl={WallUrl}
                name={state.User.name}
                userName={state.User.userName}
                following={state.User.followingCount}
                followers={state.User.followersCount}
                bio={state.User.bio}
              />
              <FollowingListTile followers={state.User.following} />
            </Box>
          </Hide>
        </Show>
        <Square
          display={"flex"}
          alignItems={"start"}
          gap="10px"
          overflowY="scroll"
          justifyContent={"start"}
          flexDirection="column"
          flex="1"
          flexBasis="110%"
        >
          <CreatePostTile
            onOpen={onOpen}
            btnRef={btnRef}
            onChange={handleChange}
            value={data.title}
            profileUrl={state.User.profileUrl}
          />
          <Box
            flexDirection="column"
            w="100%"
            gap="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {state.posts.map((post, index) => {
              return <PostTile post={post} onLike={onLike} onComment={onComment} key={index} />;
            })}
          </Box>
        </Square>
        <Show breakpoint="(min-height: 750px)">
          <Hide breakpoint="(max-width: 1090px)">
            <Box w="30vw" flexBasis="70%">
              <TrendForYou data={TrendingData} />
            </Box>
          </Hide>
        </Show>
      </Flex>
    );
}

export default Homepage;
