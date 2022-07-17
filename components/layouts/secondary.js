import Head from "next/head";
import { StyledDiv } from "../../lib/custom-component";

const Secondary = ({ children, title }) => {
  return (
    <StyledDiv>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <StyledDiv w = '100vw' maxW="100%" h = '100vh'>
        {children}
      </StyledDiv>
    </StyledDiv>
  );
};

export default Secondary;
