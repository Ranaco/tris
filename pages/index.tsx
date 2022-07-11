import ProfileCard from "../components/profile_card";
import FollowingListTile from "../components/following_list_tile";
import { Show, Hide, Flex, Square, Box } from "@chakra-ui/react";
import ProfileImage from "../public/images/profile.png";
import { AppState } from "./_app";
import WallUrl from "../public/images/landscape.png";
import dummy_data from "../lib/dummy_data";
import CreatePostTile from "../components/create_post_tile";
import { useState, useContext, useEffect } from "react";
import PostTile from "../components/post_tile";
import DummyPostData from "../lib/dummy_post_data";
import TrendForYou from "../components/trend_for_you";
import TrendingData from "../lib/dummy_trending_data";

const Homepage = () => {
  const [post, setPost] = useState("");

  const handleChange = (event) => {
    setPost(event.target.value);
  };
  const { state, setState } = useContext(AppState);

  useEffect(() => {
    const logState = () => {
      console.log("This is the state from homepage :: ", state);
    };
    logState();
  }, []);

  return (
    <Flex
      color="white"
      pt="58.5px"
      ml="auto"
      mr="auto"
      gap="20px"
      w="95%"
      flexDirection="row"
    >
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
              profileUrl={ProfileImage}
              wallUrl={WallUrl}
              name="Vishal_kr7"
              userName="vishal_002"
              following="200"
              followers="5000"
              bio={state.account}
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
          onCameraClick={() => console.log("hello there")}
          onListClick={() => console.log("hello List there")}
          onGalleryClick={() => console.log("hello Gallery there")}
          onScheduleClick={() => console.log("hello Schedule there")}
          onChange={handleChange}
          value={post}
          profileUrl={ProfileImage}
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
            return <PostTile key={index} post={post} />;
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
