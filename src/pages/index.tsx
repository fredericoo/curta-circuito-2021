import Navbar from '@/components/Navbar';
import { films } from '@/lib/mocks';
import FilmsFlicker from '@/views/FilmsFlicker/FilmsFlicker';
import { Box, Container, SimpleGrid, GridItem, Text } from '@chakra-ui/react';

const mockMenuItems = [
  { label: 'Cadernos de Crítica', path: '/cadernos' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Programação', path: '/' },
];

const Home: React.VFC = () => (
  <>
    <Navbar menuItems={mockMenuItems} />
    <Box bg="gray.100" minH="100vh" overflow="hidden">
      <Container maxW="container.xl" pt={16}>
        <SimpleGrid columns={[1, 3]} spacing={8} alignItems="center">
          <GridItem>
            <Text fontSize="md" color="pink.600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum,
              rem eum. Quia, deserunt placeat magni obcaecati nisi ipsa
              repellendus illo commodi aspernatur consectetur animi repellat
              error quo tempora, sint magnam.
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <FilmsFlicker films={films} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  </>
);

export default Home;
