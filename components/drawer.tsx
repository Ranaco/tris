import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box,
  Button,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFileWithState } from '../lib/ipfs-storage'
import { AppState } from '../pages/_app'
import LoadingBar from './loading_bar'


interface CustomDrawerProps {
  isOpen: boolean,
  setData: any,
  onClose: VoidCallback,
  finalFocusRef: any,
  data: any
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  setData,
  data,
  finalFocusRef,
}) => {
  const [progress, setProgress] = useState<string>('No file')
  const [file, setFile] = useState<any>([])
  const { state, setState } = useContext(AppState)
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
        setProgress('File selected.')
        console.log(file.size.toString());
        console.log(file.name);
      },
    });

  useEffect(() => {
  }, [data.post])

  const changeValue = (e: any) => {
    setData((val: any) => {
      return {
        ...val,
        [e.target.name]: e.target.value
      }
    })
  }

  const changeBoolValue = (e: any) => {
    e.preventDefault()
    setData((val: any) => {
      return {
        ...val,
        [e.target.name]: e.target.checked
      }
    })
  }

  const resetState = () => {
    setData({
      title: "",
      post: "",
      description: "",
      priceByOwner: "",
      isForSale: true,
      isNft: true,
    })
    setFile([])
  }

  const submitForm = async (e: any) => {
    e.preventDefault()

    if (file[0] !== undefined) {
      uploadFileWithState({ file: file[0], setProgress: setProgress }).then((val) => {
        if (val) {
          const postData = {
            title: data.title,
            description: data.description,
            priceByOwner: data.priceByOwner,
            isForSale: data.isForSale,
            isNft: data.isNft
          }
          console.log("This is the post :: ", postData)
          if (val) {
            state.UserContract.methods.uploadPost(
              postData.title,
              val,
              postData.isNft,
              postData.priceByOwner,
              postData.isForSale,
              state.account).send({ from: state.account, gasPrice: '40000000000' }).on('receipt', (rec: any) => {
                console.log("Upload post event :: ", rec.events.PostUploaded.returnValues)
                console.log('This is the transaction hash :: ', rec.transactionHash)
                console.log("This is the full receipt :: ", rec)
                const postId = rec.events.PostUploaded.returnValues.postId
                setState((val) => ({
                  ...val,
                  User: {
                    ...val.User,
                    postCount: [...val.User.postCount, postId]
                  }
                }))
              })
            console.log(state.User)
          }
          else {
            window.alert("No URL")
          }
        }
      })
    } else {
      console.log("Uploading Post to Blockchain/Contract without post")
      state.UserContract.methods.uploadPost(
        data.title,
        data.post,
        data.isNft,
        data.priceByOwner,
        data.isForSale,
        state.account).send({ from: state.account, gasPrice: '40000000000' }).on('receipt', (rec: any) => {
          console.log("Upload post event :: ", rec.events.PostUploaded.returnValues)
          console.log('This is the transaction hash :: ', rec.transactionHash)
        })
    }
  }

  const removePost = () => {
    setData((val: any) => {
      return {
        ...val,
        post: ''
      }
    })
    setFile([])
    setProgress('No file')
  }

  return (
    <Drawer
      finalFocusRef={finalFocusRef}
      size={'md'}
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={resetState}
    >
      <DrawerOverlay bg={'rgba(27, 39, 48, 0.7)'} css={{ backdropFilter: 'blur(10px)' }} />
      <DrawerContent backgroundColor='textGrey'>
        <DrawerCloseButton />
        <DrawerHeader textAlign={'center'}>
          Create your TrisNFT
        </DrawerHeader>
        <form onSubmit={submitForm}>
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
              <LoadingBar uploaded={progress} />
              <Button onClick={removePost}>Remove</Button>
              <Input
                mt="10px"
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
                mt="10px"
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


export default CustomDrawer;
