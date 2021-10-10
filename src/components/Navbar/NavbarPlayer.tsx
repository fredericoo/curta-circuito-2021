import { Box, Button, Container } from '@chakra-ui/react';
import Logo from '../Logo';
import Link from 'next/link';
import { NavbarProps } from './Navbar';
import { useRouter } from 'next/router';

const NavbarPlayer: React.VFC<NavbarProps> = () => {
  const { back } = useRouter();

  return (
    <Box as="nav" position="fixed" top={0} w="100%" zIndex="sticky">
      <Container display="flex" maxW="container.xl" px={4} py={4} justifyContent="flex-start" alignItems="center">
        <Button onClick={back} mr={4}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.5L2 8.5M2 8.5L8.5 2M2 8.5L8.5 15" stroke="black" strokeLinecap="round" />
          </svg>
        </Button>
        <Link href="/" passHref>
          <Box position="static" as="a" zIndex="sticky">
            <Logo height={'48px'} />
          </Box>
        </Link>
      </Container>
    </Box>
  );
};

export default NavbarPlayer;
