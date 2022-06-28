import { ChakraProvider } from '@chakra-ui/react'
import Layout, { ScrollBarStyle } from '../components/layouts/main'
import theme from '../lib/theme.js'
import Font from '../components/fonts'

const Website = ({ Component, pageProps, router}) => {

  const getLayout = Component.getLayout 

  return getLayout ? (
    getLayout(<ChakraProvider theme = {theme}>
    <Font/>
    <ScrollBarStyle/>
      <Component {...pageProps} key = {router.route}/>
    </ChakraProvider>) 
  ) : (
    <ChakraProvider theme = {theme}>
    <Font/>
    <ScrollBarStyle/>
     <Layout router={router}>
     <Component {...pageProps} key = {router.route}/>
     </Layout>
    </ChakraProvider>
  )
}

export default Website
