import { HStack, Box, Button, Container } from '@chakra-ui/react';
import Logo from '../Logo';
import Link from 'next/link';
import { NavbarProps } from './Navbar';
import { useRouter } from 'next/router';

const NavbarDesktop: React.VFC<NavbarProps> = ({ menuItems }) => {
  const { asPath } = useRouter();
  return (
    <Box as="nav" bg="pink.400">
      <Container display="flex" maxW="container.xl" px={4} pt={4} justifyContent="center" alignItems="flex-end">
        <Link href="/" passHref>
          <Box
            position="fixed"
            top="16px"
            left="max(1rem, calc(1rem + (100vw - var(--cc2021-sizes-container-xl)) / 2))"
            as="a"
            zIndex="sticky"
          >
            <Logo height={'92px'} />
          </Box>
        </Link>

        <HStack flexGrow={1} justify="flex-end">
          {menuItems.map(({ label, path }) => (
            <Link key={path + label} href={path} passHref>
              <Button
                display="block"
                borderRadius="0"
                bg={asPath === path ? 'gray.100' : 'gray.400'}
                h="auto"
                px={8}
                py={4}
                fontWeight="normal"
                borderTopRadius="xl"
              >
                {label}
              </Button>
            </Link>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};

export default NavbarDesktop;
