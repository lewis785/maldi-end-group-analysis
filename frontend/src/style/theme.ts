import { DefaultTheme } from 'styled-components'

// --dark-sea-green: #79b791ff;
// --terra-cotta: #e26d5aff;
// --rich-black-fogra-39: #0a090cff;
// --cg-blue: #0075a2ff;
// --lavender-blush: #f5edf0ff;

// #DAD7CD
// #A3B18A
// #588157
// #3A5A40
// #344E41

interface Shades {
  [key: number]: string
}

interface Palette {
  black: Shades
  white: Shades
  neutral: Shades
  primary: Shades
  action: Shades
}

const lightPalette: Palette = {
  black: {
    500: 'hsl(60, 6%, 18%)',
  },
  white: { 500: 'hsl(338, 28.60%, 94.50%)', 600: 'hsl(338, 28.60%, 90.50%)' },
  neutral: {
    500: 'hsl(82, 20%, 82%)',
    600: 'hsl(82, 20%, 62%)',
    700: 'hsl(82, 20%, 52%)',
    800: 'hsl(82, 20%, 42%)',
  },
  primary: {
    300: 'hsl(96, 50%, 57%)',
    400: 'hsl(96, 50%, 47%)',
    500: 'hsl(96, 50%, 37%)',
    600: 'hsl(96, 50%, 17%)',
  },
  action: {
    400: 'hsl(204, 66%, 60%)',
    500: 'hsl(204, 66%, 40%)',
    600: 'hsl(204, 66%, 20%)',
  },
}

// const lightPalette: Palette = {
//   neutral: { 500: 'hsl(302, 100.00%, 94.30%)' },
//   black: { 500: 'hsl(165, 100.00%, 7.10%)' },
//   white: { 500: 'hsl(338, 28.60%, 94.50%)' },
//   primary: {
//     400: 'hsl(138, 61.20%, 93.70%)',
//     500: 'hsl(138, 61.20%, 73.70%)',
//     600: 'hsl(138, 61.20%, 53.70%)',
//   },
//   secondary: {
//     400: 'hsl(152, 36.90%, 75.90%)',
//     500: 'hsl(152, 36.90%, 55.90%)',
//     600: 'hsl(152, 36.90%, 35.90%)',
//   },
// action: {
//   400: 'hsl(353, 36.50%, 55.70%)',
//   500: 'hsl(353, 36.50%, 45.70%)',
//   600: 'hsl(353, 36.50%, 35.70%)',
// },
// }

// const lightPalette = {
//   darkSeaGreen: '#70B791FF',
//   terraCotta: '#E26D5AFF',
//   richBlackFogra: '#0A090CFF',
//   cgBlue: '#0075A2FF',
//   lavenderBlush: '#F5EDF0FF',
//   primary: {
//     300: '#A3A4FF',
//     400: '#8884FF',
//     500: '#6c5efa',
//     600: '#573CFA',
//   },
// }

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
    family: 'prompt',
  },
}

export const lightTheme: DefaultTheme = {
  ...base,
  colors: {
    background: {
      primary: lightPalette.neutral[600],
      secondary: lightPalette.neutral[700],
    },
    text: lightPalette.black[500],
    button: {
      background: lightPalette.action[500],
      hover: lightPalette.action[400],
      text: lightPalette.white[500],
    },
    table: {
      background: lightPalette.white[500],
      hover: lightPalette.white[600],
    },
  },
}
