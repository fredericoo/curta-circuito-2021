import { extendTheme } from '@chakra-ui/react'
import colors from './colors'

export const theme = extendTheme({
  fonts: {
    body: 'futura-pt, Futura, Century Gothic, sans-serif',
    condensed: 'futura-pt-condensed, Futura, Century Gothic, sans-serif',
  },
  colors,
  config: {
    cssVarPrefix: 'cc2021',
  },
})
