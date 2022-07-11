import Image from "next/image";
import { StyledDiv } from "../lib/custom-component";
import { AppProps } from "next/app";

const TrisLogo = (props: AppProps) => {
  return (
    <StyledDiv h="200px" w="200px" {...props}>
      <Image
        src="/icons/tris_logo.png"
        alt="Tris Logo"
        height="200px"
        width="200px"
      />
    </StyledDiv>
  );
};

export default TrisLogo;
