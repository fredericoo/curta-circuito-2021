import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import { Button } from './components/button';
import shadows from './shadows';

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': { background: 'pink.400' },
    },
  },
  fonts: {
    body: 'futura-pt, Futura, Century Gothic, sans-serif',
    condensed: 'futura-pt-condensed, Futura, Century Gothic, sans-serif',
  },
  fontSizes: { md: '1.1rem' },
  colors,
  shadows,
  components: { Button },
  config: {
    cssVarPrefix: 'cc2021',
  },
});
