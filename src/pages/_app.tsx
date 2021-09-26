import { ChakraProvider } from '@chakra-ui/react';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import { theme } from '@/styles/theme';
import Navbar from '@/components/Navbar';

const mockMenuItems = [
  { label: 'Cadernos de Crítica', path: '/cadernos' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Programação', path: '/' },
];

const App: AppComponent = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar menuItems={mockMenuItems} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};
export default App;
