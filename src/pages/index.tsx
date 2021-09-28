import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import orderFilms from '@/lib/orderFilms';
import { getAllFilms, getPage } from '@/lib/queries';
import { Config, Film } from '@/lib/types';
import FilmsFlicker from '@/views/FilmsFlicker/FilmsFlicker';
import { Container, SimpleGrid, GridItem, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

type HomeProps = {
  films: Film[];
  config: Config;
};

const Home: React.VFC<HomeProps> = ({ films, config }) => (
  <>
    <Container maxW="container.xl" pt={{ md: 16 }}>
      <SEO />
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
    <Footer {...config} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const films = await getAllFilms();
  const { data: config } = await getPage('config');

  return {
    props: {
      films,
      config,
    },
    revalidate: 600,
  };
};

export default Home;
