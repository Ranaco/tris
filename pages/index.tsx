import ProfileCard from "../components/profile_card";
import FollowingListTile from "../components/following_list_tile";
import ProfileImage from "../public/images/profile.png";
import { AppState } from "./_app";
import WallUrl from "../public/images/landscape.png";
import dummy_data from "../lib/dummy_data";
import CreatePostTile from "../components/create_post_tile";
import React, { useState, useContext, useEffect, useRef } from "react";
import PostTile from "../components/post_tile";
import DummyPostData from "../lib/dummy_post_data";
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
  const postComment = ({ id, comment }) => {
    console.log("The comment from id :: ", id, " is ", comment)
  }

  const likePost = async ({ id }) => {

    console.log("This is the user data :: ", await state.UserContract.methods.getUserData(state.account).call())
    //DummyPostData[id].likes += 1
    //console.log("Liked the following id :: ", id)
  }


  //TODO: Have to remove the name and file and place post in place of them
  //after web3 storage is implemented.
  const [data, setData] = useState({
    title: "",
    file: undefined,
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
      setPageIsLoaded(true)
    }
  }

  const onFormSubmit = () => {
    console.log(data)
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
          onFormSubmit={onFormSubmit}
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
                following="200"
                followers="5000"
                bio={state.User.bio}
              />
              <FollowingListTile followers={dummy_data} />
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
            onCameraClick={() => console.log("hello there")}
            btnRef={btnRef}
            onListClick={() => console.log("hello List there")}
            onGalleryClick={() => console.log("hello Gallery there")}
            onScheduleClick={() => console.log("hello Schedule there")}
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
            {DummyPostData.map((post, index) => {
              return <PostTile likePost={likePost} post={post} id={index} postComment={postComment} />;
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

const getServerSideProps = async (ctx: any) => {

}

export default Homepage;
