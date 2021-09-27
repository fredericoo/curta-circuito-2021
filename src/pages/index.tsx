import orderFilms from '@/lib/orderFilms';
import { getAllFilms } from '@/lib/queries';
import { Film } from '@/lib/types';
import FilmsFlicker from '@/views/FilmsFlicker/FilmsFlicker';
import { Container, SimpleGrid, GridItem, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

type HomeProps = {
  films: Film[];
};

const Home: React.VFC<HomeProps> = ({ films }) => (
  <Container maxW="container.xl" pt={{ md: 16 }}>
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} alignItems="center">
      <GridItem gridRow={{ base: 2, md: 'auto' }}>
        <Text fontSize="md" color="pink.600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, rem eum. Quia, deserunt placeat magni
          obcaecati nisi ipsa repellendus illo commodi aspernatur consectetur animi repellat error quo tempora, sint
          magnam.
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <FilmsFlicker films={orderFilms(films)} />
      </GridItem>
    </SimpleGrid>
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const films = await getAllFilms();
  return {
    props: {
      films,
    },
  };
};

export default Home;
