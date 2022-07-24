import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { StyledDiv } from "../../lib/custom-component";
import Layout from "../../components/layouts/secondary";
import {
  ButtonGroup,
  Button,
  Input,
  Textarea,
  Show,
  Hide,
  Box,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import TrisLogo from "../../components/logo";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../lib/ipfs-storage";
import * as React from 'react'
import { AppState } from '../_app'
import { useRouter } from "next/router";

interface InputFieldInterface {
  name: string,
  value: any,
  onChange: any,
  title: string,
  props: any,
  width: string,
  placeholder: string,
  minWidth: string,
  disabled: boolean,
  size?: string,
  isBio?: boolean,
  isReqiured?: boolean
}

const InputField: React.FC<InputFieldInterface> = ({
  name,
  value,
  onChange,
  title,
  props,
  width,
  disabled,
  placeholder,
  minWidth,
  size,
  isBio,
  isReqiured = false,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      width={width ?? "50%"}
      bg="rgba(216, 222, 233, 0.2)"
      minWidth={minWidth ?? "300px"}
      borderRadius="15px"
      flexDirection="column"
      css={{ backdropFilter: "blur(20px)" }}
    >
      <Text fontSize="1.1em" color="lightgrey" pl="10px">
        {title}
      </Text>
      {isBio ? (
        <Textarea
          disabled={disabled}
          required={isReqiured}
          maxLength={300}
          fontSize="1.4em"
          name={name}
          style={{ ...props }}
          value={value}
          minHeight={size}
          onChange={onChange}
          display={"inline-block"}
          variant="unstyled"
          placeholder={placeholder ?? "...."}
          size={size}
          pl="10px"
        />
      ) : (
        <Input
          disabled={disabled}
          required={isReqiured}
          fontSize="1.4em"
          name={name}
          style={{ ...props }}
          value={value}
          onChange={onChange}
          display={"inline-block"}
          variant="unstyled"
          placeholder={placeholder ?? "...."}
          size={size}
          pl="10px"
        />
      )}
    </Box>
  );
};

const MastHead = () => {
  return (
    <StyledDiv
      w="100%"
      h="20%"
      mt="10px"
      display="flex"
      alignItems="center"
      justifyContent="start"
    >
      <TrisLogo mt="45px" />
      <Text fontFamily="Megrim" fontSize="8em">
        Tris
        <Text fontFamily="Shadows Into Light" fontSize="0.2em">
          The{" "}
          <span style={{ fontWeight: "bold", textAlign: "center" }}>web3</span>{" "}
          social media platform!
        </Text>
      </Text>
      <Hide breakpoint="(max-width: 1100px)">
        <StyledDiv
          fontWeight="semibold"
          flexDirection="column"
          display="flex"
          alignItems="end"
          pr="30px"
          justifyContent="end"
          ml="auto"
          alignSelf="end"
        >
          <Text fontSize="1.7em" color="#cacccf">
            Start for free
          </Text>
          <Text fontSize="2.3em">Tell us more about yourself.</Text>
        </StyledDiv>
      </Hide>
    </StyledDiv>
  );
};

const SignUp = () => {
  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const { state, setState } = useContext(AppState);
  const [file, setFile] = useState([]);
  useEffect(
    () => () => {
      file.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [file]
  );

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    userName: "",
  });

  const handleChange = (e: any) => {
    setData((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });

  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true)
    if (file[0] !== undefined) {
      await uploadFile({ file: file[0] }).then((cid) => {
        const userData = {
          name: data.firstName + ' ' + data.lastName,
          avatarUrl: cid,
          email: data.email,
          bio: data.bio,
          userName: data.userName,
          wallUrl: ''
        }
        state.UserContract.methods.createUser(
          state.account,
          userData.name,
          userData.userName,
          userData.avatarUrl,
          userData.email,
          userData.bio,
          userData.wallUrl).send({ from: state.account, gasPrice: '40000000000' }).on('receipt', (rec) => {
            console.log(rec)
            console.log("This is receipt return values, ", rec.events.UserCreated.returnValues)
            console.log('This is receipt, ', rec)
            console.log("This is the cid :: ", cid)
            window.localStorage.setItem("isAuthenticated", "true");
            router.replace('/')
          })
      });
    } else {
      const userData = {
        name: data.firstName + ' ' + data.lastName,
        avatarUrl: "",
        email: data.email,
        bio: data.bio,
        userName: data.userName,
        wallUrl: ''
      }

      state.UserContract.methods.createUser(state.account, userData.name, userData.userName, userData.avatarUrl, userData.email, userData.bio, userData.wallUrl).send({ from: state.account }).once('receipt', (rec) => {
        window.localStorage.setItem("isAuthenticated", "true");
        router.replace('/')

      })
    }
  };

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
        setData((val) => {
          return {
            ...val,
            profilePic: file,
          };
        });
        console.log(file.size.toString());
        console.log(file.name);
      },
    });

  return (
    <StyledDiv
      h="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        h="90%"
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        w="95%"
        borderRadius="20px"
        css={{ backdropFilter: "blur(20px)" }}
      >
        <MastHead />
        <Flex as={"form"} onSubmit={handleSubmit} h="70%" w="100%" mt="auto">
          <Box
            h="100%"
            w="60%"
            p="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="35px"
          >
            <Flex w="100%" justifyContent="space-evenly">
              <InputField
                disabled={disabled}
                isReqiured={true}
                title="First name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="First name"
                props={{ height: "50px" }}
                width="45%"
                minWidth="300px"
              />
              <InputField
                disabled={disabled}
                isReqiured={true}
                title="Last name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Last name"
                props={{ height: "50px" }}
                width="45%"
                minWidth="300px"
              />
            </Flex>
            <Flex w="100%" justifyContent="space-evenly">
              <InputField
                disabled={disabled}
                isReqiured={true}
                title="Username"
                name="userName"
                value={data.userName}
                onChange={handleChange}
                placeholder="Username"
                props={{ height: "50px" }}
                width="45%"
                minWidth="300px"
              />
              <InputField
                title="Email"
                disabled={disabled}
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                props={{ height: "50px" }}
                width="45%"
                minWidth="300px"
              />
            </Flex>
            <InputField
              disabled={disabled}
              title="Bio"
              name="bio"
              value={data.bio}
              onChange={handleChange}
              placeholder="Bio"
              props={{ height: "50px" }}
              isBio={true}
              size="150px"
              width="93%"
              minWidth="300px"
            />
          </Box>
          <Show breakpoint="(min-height: 750px)">
            <Hide breakpoint="(max-width: 1090px)">
              <StyledDiv
                h="100%"
                w="40%"
                display="flex"
                alignItems={"center"}
                flexDirection="column"
                justifyContent="center"
              >
                <div
                  style={{
                    marginTop: "15%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: "200px",
                    width: "300px",
                    cursor: "pointer", borderRadius: "100%"
                  }}
                  {...getRootProps()}
                >
                  <input disabled={disabled} style={{ cursor: "pointer" }} {...getInputProps()} />
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
                        border='3px dotted grey'
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
                <ButtonGroup mt="auto" mb="15%">
                  <Button
                    disabled={disabled}
                    type="submit"
                    borderRadius="30px"
                    variant="filled"
                    bg="rgba(216, 222, 233, 0.2)"
                    fontSize="1.4em"
                    css={{ backdropFilter: "blur(10px)" }}
                    h="50px"
                    w="150px"
                  >
                    {
                      disabled ? (
                        <Spinner
                          color="primary"
                          size="sm"
                          style={{ marginRight: "10px" }}
                        />
                      ) : (
                        <span>Submit</span>
                      )
                    }
                  </Button>
                </ButtonGroup>
              </StyledDiv>
            </Hide>
          </Show>
        </Flex>
      </Box>
    </StyledDiv>
  );
};

SignUp.getLayout = (page: JSX.Element) => {
  return <Layout title={"Tris - Sign up"}>{page}</Layout>;
};

export default SignUp;
