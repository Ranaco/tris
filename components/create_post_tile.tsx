import { Input, Box, Button } from "@chakra-ui/react";
import { StyledDiv } from "../lib/custom-component";
import Image from "next/image";


interface CreatePostTileInterface {
  profileUrl: any,
  onChange: any,
  value: string,
  onOpen: any,
  btnRef: any,
}

const CreatePostTile: React.FC<CreatePostTileInterface> = ({
  profileUrl,
  onChange,
  value,
  onOpen,
  btnRef,
}) => {
  return (
    <StyledDiv
      display="flex"
      justifyContent="center"
      flexDirection="column"
      bg="textGrey"
      p="10px"
      borderRadius="20px"
      w="100%"
    >
      <StyledDiv
        h="100%"
        w="100%"
        gap='10px'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box h="8%" w="13%" alignSelf="start">
          <Image height='100%' width='100%' style={{ borderRadius: '100%' }} src={profileUrl} alt="profile image" />
        </Box>
        <Input
          border="none"
          type="text"
          borderRadius="20px"
          h="80%"
          minH={'50px'}
          bg="lightGrey"
          placeholder="What's popping?"
          _placeholder={{ color: "grey" }}
          onChange={onChange}
          value={value}
        />
        <Button ref={btnRef} h='80%' borderRadius={'20px'} onClick={onOpen}>Post/Create</Button>
      </StyledDiv>
    </StyledDiv>
  );
};

export default CreatePostTile;
