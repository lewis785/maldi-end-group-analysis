import { lightTheme } from './../style/theme'
import 'styled-components'
import theme from ''

type CustomTheme = typeof lightTheme

interface Colors {
  background: {
    primary: string
    secondary: string
  }
  text: string
  button: { background: string; hover: string; text: string }
  table: { background: string; hover: string }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: {
      sm: string
      rg: string
      lg: string
    }
    font: {
      size: {
        sm: string
        rg: string
        lg: string
      }
      family: string
    }
    colors: Colors
  }
}
