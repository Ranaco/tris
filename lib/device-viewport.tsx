import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      };

      handleResize;

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  });
  return windowDimensions;
};

export default getWindowDimensions;
