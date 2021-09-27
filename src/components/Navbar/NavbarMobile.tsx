import { HStack, Box, Button, Container } from '@chakra-ui/react';
import Logo from '../Logo';
import Link from 'next/link';
import { NavbarProps } from './Navbar';
import { useRouter } from 'next/router';

const NavbarMobile: React.VFC<NavbarProps> = ({ menuItems }) => {
  const { asPath } = useRouter();
  return (
    <>
      <Box as="aside" bg="pink.400" zIndex="overlay">
        <Container display="flex" maxW="container.xl" px={4} pt={4} justifyContent="center" lignItems="flex-end">
          <Link href="/" passHref>
            <Box as="a" mb="-2%" zIndex="sticky">
              <Logo height={'48px'} />
            </Box>
          </Link>
        </Container>
      </Box>

      <Box
        as="nav"
        position="fixed"
        bottom="0"
        left="4"
        right="4"
        zIndex="overlay"
        overflow="hidden"
        fontWeight="normal"
      >
        <HStack spacing={1} overflowX="scroll" justify="center" align="flex-end">
          {menuItems.map(({ label, path }) => (
            <Link key={path + label} href={path} passHref>
              <Button
                pb={`calc(${asPath === path ? 0.75 : 1.5}em + env(safe-area-inset-bottom))`}
                display="block"
                borderBottomRadius="none"
                borderTopRadius="xl"
                bg={asPath === path ? 'pink.400' : 'gray.200'}
                color={asPath === path ? 'white' : 'gray.800'}
                _hover={{ bg: asPath === path ? 'pink.400' : 'gray.200' }}
                h="auto"
                px={4}
                fontSize="1rem"
                boxShadow="sm"
                transition="padding 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
              >
                {label}
              </Button>
            </Link>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default NavbarMobile;
