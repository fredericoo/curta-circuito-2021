import { HStack, Box, Button, Container } from '@chakra-ui/react';
import Logo from '../Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  menuItems: { label: string; path: string }[];
};

const Navbar: React.VFC<Props> = ({ menuItems }) => {
  const { asPath } = useRouter();
  return (
    <Container
      display="flex"
      maxW="container.xl"
      px={4}
      pt={4}
      alignItems="flex-end"
    >
      <Link href="/" passHref>
        <Box as="a" mb="-32px" zIndex="sticky">
          <Logo height="93px" />
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
  );
};

export default Navbar;
