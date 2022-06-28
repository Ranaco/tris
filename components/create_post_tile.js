import { Input, Container, Box, Button, ButtonGroup } from '@chakra-ui/react'
import { StyledDiv } from '../lib/custom-component'
import { useState } from 'react'
import List from '../public/icons/list.svg'
import Gallery from '../public/icons/gallery.svg'
import Camera from '../public/icons/camera.svg'
import Schedule from '../public/icons/schedule.svg'
import Image from 'next/image'

const boxShoadow = "0px 5px 25px rgba(0,0,0,0.5)"

const CustomRoundedButton = ({ onClick, iconText, icon, text}) => {
  return(
    <StyledDiv _hover={{
      boxShadow: boxShoadow,
    }} display = "flex" alignItems = "center" gap = "8px"
      onHoverStart = {() => {
        console.log("hover start")
      }}
     justifyContent = "space-evenly" p = "20px" w = "60%" h = "50px" borderRadius = "30px" onClick={onClick} border = "0.3px solid grey" cursor = "pointer">
    <Image src = {icon} width =  "20px" height =  "20px" alt = {iconText}/>
    {text}
    </StyledDiv>
  )
}

const CreatePostTile = ( { profileUrl, onChange, setState, value, onCameraClick, onListClick, onGalleryClick, onScheduleClick } ) => {
  return(
    <StyledDiv display = 'flex' justifyContent = 'center' flexDirection = 'column' bg = "textGrey" p = "20px" borderRadius = "20px"  w = "100%" >
        <StyledDiv h = "50%" w= "100%" display = "flex" alignItems = "center" justifyContent = "center">
          <Box h = "8%" w = "8%" alignSelf = "start">
          <Image src = {profileUrl} alt = "profile image" lazyload/>
          </Box>
          <Box p = "0px" m = "0px"  w= "100%" h = "100%"  pl = "10px">
          <Input border = "none"  type = "text" borderRadius = "20px" h = "80%" bg = "lightGrey" placeholder = "What's popping?" _placeholder = {{ color: "grey" }}  onChange = {onChange} value = {value}/> 
          </Box>
      </StyledDiv>
    <ButtonGroup overflowX={'scroll'} p = '20px' overflowY = 'hidden'>
      <CustomRoundedButton iconText = "list" icon = {List} text = "Thread" onClick = {onListClick}/>
      <CustomRoundedButton iconText="gallery" icon = {Gallery} text = "Gallery" onClick = {onGalleryClick}/>
      <CustomRoundedButton iconText = "camera" icon = {Camera} text = "Video" onClick = {onCameraClick}/>
      <CustomRoundedButton iconText = "sch" icon = {Schedule} text = "Schedule" onClick = {onScheduleClick}/>
    </ButtonGroup>
    </StyledDiv>
  )
}

export default CreatePostTile
