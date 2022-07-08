import { useContext, useState, useEffect } from 'react'
import { AppState } from '../_app'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { StyledDiv } from '../../lib/custom-component'
import Layout from '../../components/layouts/secondary'
import image from '../../public/images/background.jpg'
import { ButtonGroup, Button, Input, Textarea, Show, Hide, Box, Flex, Container, Text } from '@chakra-ui/react'
import TrisLogo from '../../components/logo'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../lib/ipfs-storage'

const InputField = ({ name, value, onChange, title, props, width, placeholder, minWidth, size, isBio, isReqiured = false }) => {
  return(
   <Box display = 'flex' justifyContent = 'start' width = {width ?? '50%'} bg = 'rgba(216, 222, 233, 0.2)'  minWidth = {minWidth ?? '300px'} borderRadius = '15px' flexDirection = 'column' css = {{ backdropFilter: 'blur(20px)' }}>
      <Text fontSize = '1.1em' color = 'white' pl = '10px'>
        {title}
      </Text>
      {
        isBio 
        ?      <Textarea required={isReqiured} maxLength={'300'} fontSize = '1.4em' name = {name} style = {{ ...props }} value = {value} minHeight = {size} onChange = {onChange} display={'inline-block'} variant = 'unstyled' placeholder = {placeholder ?? "...."} size = {size} pl = '10px'/>
        :       <Input required = {isReqiured} fontSize = '1.4em' name = {name} style = {{ ...props }} value = {value} onChange = {onChange} display={'inline-block'} variant = 'unstyled' placeholder = {placeholder ?? "...."} size = {size} pl = '10px'/>

      }
    </Box> 
  )
}

const MastHead = () => {
  return(
    <StyledDiv w = '100%' h = '20%' mt = '10px' display = 'flex' alignItems = 'center' justifyContent = 'start'>
      <TrisLogo mt = '45px'/> 
      <Text fontFamily = 'Megrim' fontSize = '8em' >
          Tris
      <Text fontFamily = 'Shadows Into Light' fontSize = '0.2em'>
         The <span style={{ fontWeight: 'bold', textAlign: 'center' }}>web3</span> social media platform! 
      </Text>
      </Text>
        <Hide breakpoint='(max-width: 1100px)'>
      <StyledDiv fontWeight = 'semibold' flexDirection = 'column' display = 'flex' alignItems = 'end' pr = '30px' justifyContent = 'end' ml = 'auto' alignSelf = 'end'>
        <Text fontSize = '1.7em' color = '#cacccf'>
          Start for free
        </Text>
        <Text fontSize = '2.3em'>
          Tell us more about yourself.
        </Text>
      </StyledDiv>
    </Hide>
    </StyledDiv>
  )
}

const SignUp = () => {

  const [ file, setFile ] = useState([])
  const router = useRouter()
  const [ isDisabled, setIsDisabled] = useState(true)
  useEffect(() =>
     () => {
      file.forEach((file) => URL.revokeObjectURL(file.preview))
    },
   [file])

  const [ data, setData ] = useState({
    firstName: '',
    lastName: '',
    profilePic: undefined,
    email: '',
    bio: '',
    userName: ''
  })


  const handleChange = (e) => {
    setData((val) => {
      return{
        ...val,
        [e.target.name]: e.target.value,
      }
    })
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cid = await uploadFile({file: data.profilePic})
    console.log(cid)
    
  }

  const { acceptedfile, getRootProps, getInputProps, isDragActive } =
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
            profilePic: file
          }
        })
        console.log(file.size.toString());
        console.log(file.name);
      },

      
    });


  return(
    <StyledDiv h = '100vh' w = '100%' display = 'flex' alignItems = 'center' justifyContent = 'center' >
     <Box h = '90%' display = 'flex' flexDirection = 'column' alignItems = 'start' justifyContent = 'start' w = '95%' borderRadius = '20px' css = {{ backdropFilter: 'blur(20px)' }}>
      <MastHead/>
        <Flex as={'form'} onSubmit={handleSubmit} h = '70%' w = '100%' mt = 'auto'>
          <Box h = '100%' w = '60%' p = '20px' display = 'flex' flexDirection = 'column' alignItems = 'center' justifyContent = 'center' gap = '35px'>
            <Flex w = '100%' justifyContent = 'space-evenly'>
               <InputField isReqiured={true} title = 'First name' name = 'firstName' value = {data.firstName} onChange = {handleChange} placeholder = 'First name' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
               <InputField isReqiured={true} title = 'Last name' name = 'lastName' value = {data.lastName} onChange = {handleChange} placeholder = 'Last name' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
            </Flex>
            <Flex w = '100%' justifyContent = 'space-evenly'>
               <InputField isReqiured={true}  title = 'Username' name = 'userName' value = {data.userName} onChange = {handleChange} placeholder = 'Username' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
               <InputField  title = 'Email' name = 'email' value = {data.email} onChange = {handleChange} placeholder = 'Email' props = {{ height: '50px' }} width = '45%' minWidth = '300px'/>
            </Flex>
              <InputField  title = 'Bio' name = 'bio' value = {data.bio} onChange = {handleChange} placeholder = 'Bio' props = {{ height: '50px' }} isBio = {true} size = '150px' width = '93%' minWidth = '300px'/>
          </Box>
      <Show breakpoint='(min-height: 750px)'>
        <Hide breakpoint='(max-width: 1090px)'>
        <StyledDiv h ='100%' w = '40%' display = 'flex' alignItems={'center'} flexDirection = 'column' justifyContent = 'center' >
        <StyledDiv
          mt = '15%'
          display = 'flex'
          alignItems = 'center'
          justifyContent= 'center'
          position={'relative'}
          w = '20vh'
          h = '20vh'
            style={{ cursor: "pointer", borderRadius: '100%' }}
            {...getRootProps()}
          >
        <Input style={{ cursor: "pointer" }} {...getInputProps()} />
            {file[0] == null ? (
              !isDragActive ? (
                  <Image src={image} height="100%" width="100%" layout='fill' style = {{ borderRadius:'100%' }} />
              ) : (
                  <Image src={file[0] == null ? image : file[0].preview} height="100%" width="100%" layout='fill' style = {{ borderRadius: '100%' }}/>
              )
            ) : (
                <Image src={file[0].preview} height="100%" width="100%" layout='fill' style = {{ borderRadius: '100%' }}/>
            )}
            </StyledDiv>
           <ButtonGroup mt = 'auto' mb = '15%'>
            <Button type='submit' borderRadius = '30px' variant = 'filled' bg = 'rgba(216, 222, 233, 0.2)' fontSize = '1.4em' css = {{ backdropFilter: 'blur(10px)'}} h = '50px' w = '150px'>
              Continue 
            </Button> 
           </ButtonGroup> 
        </StyledDiv>
        </Hide>
        </Show>
  </Flex>
      </Box>         
    </StyledDiv>  
  )
}

SignUp.getLayout = (page) => {
  return(
    <Layout title = {'Tris - Sign up'}>
      {page}
    </Layout>
  )
}

export default SignUp
