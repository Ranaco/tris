import { ChakraProvider } from '@chakra-ui/react'
import Layout, { ScrollBarStyle } from '../components/layouts/main'
import theme from '../lib/theme.js'
import { Megrim,  MPLUS, Tillana, ShadowsIntoLight, Rubik, PermanentMarker, Sacramento  } from '../components/fonts'

const Website = ({ Component, pageProps, router}) => {

  const getLayout = Component.getLayout 

  return getLayout ? (
    getLayout(<ChakraProvider theme = {theme}>
    <MPLUS/>
    <ShadowsIntoLight/>
      <Rubik/>
      <Sacramento/>
      <Tillana/>
      <Megrim/>
      <PermanentMarker/>
    <ScrollBarStyle/>
      <Component {...pageProps} key = {router.route}/>
    </ChakraProvider>) 
  ) : (
    <ChakraProvider theme = {theme}>
    <MPLUS/>
    <ShadowsIntoLight/>
    <Rubik/>
    <Tillana/>
    <Megrim/>
    <Sacramento/>
    <PermanentMarker/>
    <ScrollBarStyle/>
     <Layout router={router}>
     <Component {...pageProps} key = {router.route}/>
     </Layout>
    </ChakraProvider>
  )
}

export default Website
