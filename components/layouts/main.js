import Head from 'next/head'
import { Container, Box } from '@chakra-ui/react'
import NavBar from '../navbar'

const Main = ({ children, router }) => {
    return (
    <Box as = "main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Rana Satyam Raj - Homepage </title>
      </Head>
        <NavBar route = {router.asPath}/>
          <Box
            maxW = "100%"
            w = "100vw"
            pt = "100px"
              style=
        {{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
          {children}
          </Box>
    </Box>
  )
}

export default Main
