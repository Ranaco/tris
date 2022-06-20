import Head from 'next/head'
import NavBar from '../navbar'
import { StyledDiv } from '../../lib/custom-component'

const Main = ({ children, router }) => {
    return (
    <StyledDiv as = "main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Tris - Home </title>
      </Head>
        <NavBar route = {router.asPath}/>
          <StyledDiv
            maxH = "100%"
            pt = "60px"
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
