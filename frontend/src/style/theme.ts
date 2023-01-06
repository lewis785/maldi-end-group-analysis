import { DefaultTheme } from 'styled-components'

// --dark-sea-green: #79b791ff;
// --terra-cotta: #e26d5aff;
// --rich-black-fogra-39: #0a090cff;
// --cg-blue: #0075a2ff;
// --lavender-blush: #f5edf0ff;

const lightPalette = {
  darkSeaGreen: '#70B791FF',
  terraCotta: '#E26D5AFF',
  richBlackFogra: '#0A090CFF',
  cgBlue: '#0075A2FF',
  lavenderBlush: '#F5EDF0FF',
  primary: {
    300: '#A3A4FF',
    400: '#8884FF',
    500: '#6C5EFA',
    600: '#573CFA',
  },
}

const base = {
  spacing: {
    sm: '0.5rem',
    rg: '1rem',
    lg: '1.5rem',
  },
  font: {
    size: {
      sm: '0.875rem',
      rg: '1rem',
      lg: '1.5rem',
    },
  },
}

export const lightTheme: DefaultTheme = {
  ...base,
  primary: {
    text: lightPalette.richBlackFogra,
    background: lightPalette.darkSeaGreen,
    action: lightPalette.cgBlue,
    white: lightPalette.lavenderBlush,
  },
  secondary: {
    text: lightPalette.richBlackFogra,
    background: lightPalette.terraCotta,
    action: lightPalette.cgBlue,
    white: lightPalette.lavenderBlush,
  },
}
