import ProfileCard from "../components/profile_card";
import FollowingListTile from "../components/following_list_tile";
import ProfileImage from "../public/images/profile.png";
import { AppState } from "./_app";
import WallUrl from "../public/images/landscape.png";
import dummy_data from "../lib/dummy_data";
import CreatePostTile from "../components/create_post_tile";
import { useState, useContext, useEffect, useRef } from "react";
import PostTile from "../components/post_tile";
import DummyPostData from "../lib/dummy_post_data";
import TrendForYou from "../components/trend_for_you";
import TrendingData from "../lib/dummy_trending_data";
import { useDropzone } from "react-dropzone";
import {
  Show,
  Hide,
  Button,
  Flex,
  Square,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Image from 'next/image'

interface CustomDrawerProps {
  isOpen: boolean,
  onFormSubmit: any,
  setData: any,
  onClose: VoidCallback,
  finalFocusRef: any,
  data: any
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  onFormSubmit,
  setData,
  data,
  finalFocusRef,
}) => {

  const [file, setFile] = useState<any>([])
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop: (acceptedfile) => {
        const file = acceptedfile[0];
        setFile(
          acceptedfile.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          })
        );
        setData((val: any) => {
          return {
            ...val,
            file: [file],
          };
        });
        console.log(file.size.toString());
        console.log(file.name);
      },
    });

  const changeValue = (e: any) => {
    console.log(e.target.checked)
    setData((val: any) => {
      return {
        ...val,
        [e.target.name]: e.target.value
      }
    })
    console.log(data)
  }

  const changeBoolValue = (e: any) => {
    e.preventDefault
    console.log(data)
    console.log(e.target.checked)
    setData((val: any) => {
      return {
        ...val,
        [e.target.name]: e.target.checked
      }
    })
  }

  const removePost = () => {
    setData((val) => {
      return {
        ...val,
        file: []
      }
    })
  }

  return (
    <Drawer
      finalFocusRef={finalFocusRef}
      size={'md'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor='textGrey'>
        <DrawerCloseButton />
        <DrawerHeader textAlign={'center'}>
          Create your TrisNFT
        </DrawerHeader>
        <form onSubmit={onFormSubmit}>
          <DrawerBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'column', gap: '30px' }}>
              <div
                style={{
                  marginTop: "15%",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  width: "300px",
                  height: "200px",
                  cursor: "pointer", borderRadius: "100%"
                }}
                {...getRootProps()}
              >
                <input style={{ cursor: "pointer" }} {...getInputProps()} />
                {file[0] == null ? (
                  !isDragActive ? (
                    <Box
                      backgroundColor='blackAlpha.100'
                      height="100%"
                      width="100%"
                      style={{ borderRadius: "20px" }}
                      display='flex'
                      alignItems={'center'}
                      justifyContent='center'
                      border='3px dotted grey'
                    >
                      Upload Image
                    </Box>
                  ) : (
                    <Box
                      backgroundColor='blackAlpha.100'
                      height="100%"
                      width="100%"
                      style={{ borderRadius: "20px" }}
                      display='flex'
                      alignItems={'center'}
                      justifyContent='center'
                    >
                      Drop here
                    </Box>
                  )
                ) : (
                  <Image
                    src={file[0].preview}
                    layout="fill"
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </div>
              <Button onClick={removePost}>Remove</Button>
              <Input
                mt="30px"
                border="none"
                type="text"
                borderRadius="20px"
                h="60px"
                bg="lightGrey"
                placeholder="Name"
                _placeholder={{ color: "grey" }}
                name='title'
                onChange={changeValue}
                value={data.title}
              />
              <Input
                mt="30px"
                border="none"
                type="text"
                borderRadius="20px"
                h="60px"
                bg="lightGrey"
                placeholder="Description"
                _placeholder={{ color: "grey" }}
                name='description'
                onChange={changeValue}
                value={data.description}
              />
              <div style={{ display: 'flex', gap: "20px" }}>
                <input type='checkbox' checked={data.isNft} style={{ height: '20px', width: '20px' }} name='isNft' id='isNft' onChange={changeBoolValue} />Upload as NFT?
                <input disabled={!data.isNft} type='checkbox' checked={data.isForSale} style={{ height: '20px', width: '20px' }} name='isForSale' id='isForSale' onChange={changeBoolValue} />Is for sale?
              </div>
              <input
                style={{
                  marginTop: '30px',
                  border: 'none',
                  borderRadius: '20px',
                  height: '60px',
                  backgroundColor: '#28343E',
                  paddingLeft: '20px',
                  cursor: data.isNft ? 'text' : 'not-allowed'
                }}
                disabled={!data.isNft}
                placeholder={!data.isNft ? "Post is not NFT" : "Enter price"}
                type='number'
                name='priceByOwner'
                onChange={changeValue}
                value={data.priceByOwner}
              />
              <Button type="submit">Upload</Button>
            </div>
          </DrawerBody>
        </form>
        <DrawerFooter fontSize={'0.7em'}>
          &copy; {new Date().getFullYear()} Tris. All Rights Reserved.
        </DrawerFooter>
      </DrawerContent >
    </Drawer >
  )
}

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

  //TODO: Have to remove the name and file and place post in place of them
  //after web3 storage is implemented.
  const [data, setData] = useState({
    title: "",
    file: [],
    description: "",
    priceByOwner: "",
    isForSale: true,
    isNft: true,
  })
  const { state, setState } = useContext(AppState);
  const btnRef = useRef()

  useEffect(() => {
    const logState = () => {
      console.log("This is the state from homepage :: ", state);
    };
    logState();
  }, []);

  const onFormSubmit = (e: any) => {
    e.preventDefault()
    console.log(data)
  }

  return (
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
          onOpen={onOpen}
          onCameraClick={() => console.log("hello there")}
          btnRef={btnRef}
          onListClick={() => console.log("hello List there")}
          onGalleryClick={() => console.log("hello Gallery there")}
          onScheduleClick={() => console.log("hello Schedule there")}
          onChange={handleChange}
          value={data.title}
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
          {DummyPostData.map((post) => {
            return <PostTile post={post} />;
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
