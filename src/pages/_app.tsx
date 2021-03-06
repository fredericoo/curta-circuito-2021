import { ChakraProvider, Box } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import Navbar from '@/components/Navbar';
import Router, { CompletePrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import { NextRoute } from '@/lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';

const isProd = process.env.NODE_ENV === 'production';
const menuItems = [
  { label: 'Cadernos de Crítica', path: '/critica' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Convidados', path: '/convidados' },
  { label: 'Programação', path: '/' },
];

type AppProps = Pick<CompletePrivateRouteInfo, 'err'> & {
  router: Router;
} & { Component: NextRoute; pageProps: Record<string, unknown> };

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProd) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const NavbarComponent = Component.Navbar || Navbar;
  return (
    <ChakraProvider theme={theme}>
      <NavbarComponent menuItems={menuItems} />
      <Box bg="gray.100">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};
export default App;
