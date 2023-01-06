import { lightTheme } from './../style/theme'
import 'styled-components'
import theme from ''

type CustomTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      size: {
        sm: string
        rg: string
        lg: string
      }
    }
    primary: {
      text: string
      background: string
      action: string
      white: string
    }
    secondary: {
      text: string
      background: string
      action: string
      white: string
    }
  }
}
