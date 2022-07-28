import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'M PLUS Rounded 1c'",
      padding: 0,
      backgroundPosition: "center",
      bg: "url(https://i.gifer.com/IxK.gif)",
      margin: 0,
    },
  }),
};

const component = {
  Text: {
    variants: {
      "logo-heading": {
        fontFamily: "Shadows Into Light",
      },
    },
  },
};

const fonts = {
  heading: "'M PLUS Rounded 1c'",
  text: "'M PLUS Rounded 1c'",
};

const colors = {
  lightGrey: "#28343E",
  blue: "#6272A4",
  darkGrey: "#06141D",
  primaryGrey: "#282A36",
  textGrey: "#1B2730",
  grassTeal: "#1D90F5",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ styles, component, fonts, colors, config });

export default theme;
