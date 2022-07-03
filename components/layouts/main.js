import Head from 'next/head'
import NavBar from '../navbar'
import { StyledDiv } from '../../lib/custom-component'
import BackgroundImage from '../../public/images/background.jpg'
import { Global } from '@emotion/react'

export const ScrollBarStyle = () => {
  return(
    <Global
     styles = {
      `
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #28343E;
        border-radius: 10px;
      }
      `
     }
    />
  )
}

const Main = ({ children, router }) => {
    return (
    <StyledDiv  as = "main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Tris - { router.asPath == '/marketplace' ? 'Marketplace' : 'Home'} </title>
      </Head>
        <NavBar route = {router.asPath}/>
          <StyledDiv
        backgroundImage = 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)'
        backgroundPosition = "center"
        maxH = "100%"
              style=
        {{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
          {children}
          </StyledDiv>
    </StyledDiv>
  )
}

export default Main
