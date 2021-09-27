import { HStack, Box, Button, Container } from '@chakra-ui/react';
import Logo from '../Logo';
import Link from 'next/link';
import { NavbarProps } from './Navbar';
import { useRouter } from 'next/router';

const NavbarDesktop: React.VFC<NavbarProps> = ({ menuItems }) => {
  const { asPath } = useRouter();
  return (
    <Box as="nav" bg="white">
      <Container display="flex" maxW="container.xl" px={4} pt={4} justifyContent="center" lignItems="flex-end">
        <Link href="/" passHref>
          <Box as="a" mb="-2%" zIndex="sticky">
            <Logo height={'92px'} />
          </Box>
        </Link>

        <HStack flexGrow={1} justify="flex-end" spacing={0}>
          {menuItems.map(({ label, path }) => (
            <Link key={path + label} href={path} passHref>
              <Button
                display="block"
                borderRadius="0"
                bg={asPath === path ? 'gray.100' : 'transparent'}
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
