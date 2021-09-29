import { ChakraProvider, Box } from '@chakra-ui/react';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import { theme } from '@/styles/theme';
import Navbar from '@/components/Navbar';

const mockMenuItems = [
  { label: 'Cadernos de Crítica', path: '/critica' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Convidados', path: '/convidados' },
  { label: 'Programação', path: '/' },
];

const App: AppComponent = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar menuItems={mockMenuItems} />
      <Box bg="gray.100">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};
export default App;
