import { Box, Container, Text, Input } from '@chakra-ui/react'
import getWindowDimensions from '../lib/device-viewport'
import { useState } from 'react'
import { FaInbox,
        } from 'react-icons/fa'
import { RiNotification4Fill } from 'react-icons/ri'
import { CgMenuGridO } from 'react-icons/cg'
import { MdArrowDropDown } from 'react-icons/md'
import { SiMarketo } from 'react-icons/si'
import NextLink from 'next/link'

const CapsuleSearchBar = ({ handleChange, query }) => {
const size = getWindowDimensions()
  return(
       <Input placeholder = "#search"
    type = "search"
    color = 'white'
    w = {size.width < "960" ? "30vw" : "330px"}
    borderRadius = "30px"
    backgroundColor = "lightGrey"
    h = "45"
    marginLeft = "45px"
    value = {query}
    onChange = {handleChange}
    border = "undefined"/>
  )
}

const ProfileButton = () => {
  return(
    <Container
    as = "span"
    color = 'white'
    _hover = {{ fontWeight: 'semibold', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)'}}
    cursor = "pointer"
    display = "flex"
    color = 'white'
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

export const CustomDivider = ({ css, height, width, bgColor = "lightGrey" }, props) => {
  return(
    <Container height = {height} css = {css} width = {width} opacity = "0.5" bgColor = {bgColor} p = { 0 } m = { 0 } {...props}/>
  )
}

const Navbar = ({ href, path, target, children, ...props}) => {
  const size = getWindowDimensions() 
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
      {size.width < "710" ? undefined :  <CapsuleSearchBar handleChange = {handleChange} query = {query}/>
} {size.width < "710" ? undefined : <div style = {{ flex: "1"}}/>}
      
      <Box
      mr = "20px"
      spacing = "24px" 
      display = "flex"
      wrap = "wrap"
      p = { 0 }
      alignItems = "center" 
      justifyContent = "center"
      gap = "15px">
        <NextLink href = 'marketplace'>
          <a>  
            <SiMarketo color = 'lightGrey' size = '30' style = {{ cursor : 'pointer' }}/>
          </a> 
        </NextLink>
        <FaInbox color = "lightGrey" size = "30" style = {{ cursor: "pointer" }}/>
        <RiNotification4Fill size = "30" color = "lightGrey" style = {{ cursor: "pointer" }}/>
        {size.width > "710" ? undefined : <div style = {{ flex: "1"}}/>}
        <CustomDivider height = "40px" bgColor = "lightGrey"  width = "1px"/>
        <ProfileButton/>
        <CgMenuGridO style = {{ cursor: "pointer"}} color = "lightGrey" size = "30px"/>
    </Box>
        
      </Box>
    )
}

export default Navbar
