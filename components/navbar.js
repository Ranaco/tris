import { Box, Container, Text, Input, Heading, Link, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import getWindowDimensions from '../lib/device-viewport'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaInbox,
        } from 'react-icons/fa'
import { RiNotification4Fill, RiNotification4Line} from 'react-icons/ri'
import { CgMenuLeft, CgMenuGridO } from 'react-icons/cg'
import { MdArrowDropDown } from 'react-icons/md'

const CapsuleSearchBar = ({ handleChange, query }) => {
  
  const size = getWindowDimensions()
  return(
       <Input placeholder = "#search"
    type = "text"
    w = {size.width < "960" ? "30vw" : "300px"}
    borderRadius = "30px"
    color = "wheat"
    h = "45"
    marginLeft = "45px"
    bgColor = "textGrey"
    value = {query}
    onChange = {handleChange}
    border = "undefined"/>
  )
}

const ProfileButton = () => {
  return(
    <Container
    as = "span"
    _hover = {{ fontWeight: 'semibold', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)'}}
    cursor = "pointer"
    display = "flex"
    alignItems = "center"
    justifyContent = "start"
    p = { 2 } 
    m = { 0 }
    w = "150px"
    h = "45px"
    gap = "5px" 
    borderRadius = "35px"
    bgColor = "textGrey"
    >
     <Container borderRadius = "100px" w = "35px" h = "35px" p = { 0 } m = { 0 } bgColor = 'lightGrey' >    </Container>
    <Text w = "70px" overflow= "hidden !important" textOverflow = "eclipse" display = "inline-block" whiteSpace = "nowrap" fontSize = "15px" color = "lightGrey">
      Vishal1934
    </Text>
    <MdArrowDropDown color = "lightGrey" size = "35"/>
    </Container>
  )
}

export const Divider = ({ css, height, width, bgColor = "lightGrey" }, props) => {
  return(
    <Container height = {height} css = {css} width = {width} opacity = "0.5" bgColor = {bgColor} p = { 0 } m = { 0 } {...props}/>
  )
}

const Navbar = ({ href, path, target, children, ...props}) => {
  
  const [ query, setQuery ] = useState("")
  const handleChange = (event) => setQuery(event.target.value)
  return(
      <Box
      css = {{ backdropFilter: 'blur(30px)'}}
      zIndex = { 4 }
      position = "fixed"
      h = "60px"
      maxW = "100%"
      w = "100%"
      wrap = "wrap"
      as = "nav"
      display = "flex"
      alignItems = "center"
      justifyContent = "start"
      >
      <CapsuleSearchBar handleChange = {handleChange} query = {query}/>
      <div style = {{ flex: "1"}}/>
      <Box
      mr = "20px"
      spacing = "24px" 
      display = "flex"
      p = { 0 }
      alignItems = "center" 
      justifyContent = "center"
      gap = "15px">
        <FaInbox color = "lightGrey" size = "30" style = {{ cursor: "pointer" }}/>
        <RiNotification4Fill size = "30" color = "lightGrey" style = {{ cursor: "pointer" }}/> 
        <Divider height = "40px" bgColor = "lightGrey"  width = "1px"/>
        <ProfileButton/>
        <CgMenuGridO style = {{ cursor: "pointer"}} color = "lightGrey" size = "30px"/>
    </Box>
        
      </Box>
    )
}

export default Navbar
