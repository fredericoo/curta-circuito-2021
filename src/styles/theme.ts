import { extendTheme } from '@chakra-ui/react'
import colors from './colors'

export const theme = extendTheme({
  colors,
  config: {
    cssVarPrefix: 'cc2021',
  },
})
