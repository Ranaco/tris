import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: props => ({
    body: {
      fontFamily: "'M PLUS Rounded 1c'",
      padding: 0,
      margin: 0,
      bg: "darkGrey"
    }
  })
}

const component = {}

const fonts = {
  heading: "'M PLUS Rounded 1c'",
  text: "'M PLUS Rounded 1c'"
}

const colors = {
  lightGrey: "#919BAB",
  blue: "#6272A4",
  darkGrey: "#06141D",
  primaryGrey: "#282A36",
  textGrey: "#1B2730",
  grassTeal: "#1D90F5"
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ styles, component, fonts, colors, config})

export default theme
