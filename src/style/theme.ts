import { createTheme } from '@mui/material'
import { Theme as MaterialUITheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  export interface Theme {
    app: {
      palette: typeof palette
      typography: typeof typography
      size: typeof size
    }
  }
  export interface ThemeOptions {
    app?: {
      palette?: typeof palette
      typography?: typeof typography
      size?: typeof size
    }
  }
}

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme {}
}

const palette = {
  green1: '#069C31',
  green2: '#E3FFEA',
  green3: '#ECF2F3',
  green4: '#C9FAD7',
  gray1: '#AEAEAE',
  gray2: '#F0F0F0',
  yellow1: '#FEF0BD',
  yellow2: '#FEF9E4',
  black: '#222222',
  white: '#FAFAFA',
  orange: '#E2532D',
  red: '#E2532D',
}

const typography = {
  fontFamily: 'Pretendard',
}

const size = {
  header: {
    height: '65px',
  },
  nav: {
    width: '260px',
  },
  font: {
    small: '14px',
    base: '16px',
    medium: '20px',
    large: '24px',
    huge: '30px',
    title: '36px',
  },
}

export const theme = createTheme({
  app: {
    palette,
    typography,
    size,
  },
})
