import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: props => ({
    body: {
      fontFamily: "'M PLUS Rounded 1c'",
      padding: 0,
      backgroundPosition: "center",
      bg: 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
      margin: 0,
    }
  })
}

const component = {
  Text: {
    variants: {
      'logo-heading': {
        fontFamily: 'Shadows Into Light'
      }
    }
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'",
  text: "'M PLUS Rounded 1c'"
}

const colors = {
  lightGrey: "#28343E",
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
