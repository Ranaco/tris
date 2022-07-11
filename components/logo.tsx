import Image from "next/image";
import { StyledDiv } from "../lib/custom-component";

const TrisLogo = (props: any) => {
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
