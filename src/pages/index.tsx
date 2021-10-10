import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import orderFilms from '@/lib/orderFilms';
import { getAllFilms, getPage } from '@/lib/queries';
import { Config, Film, NextRoute, PrismicImage } from '@/lib/types';
import FilmsFlicker from '@/views/FilmsFlicker/FilmsFlicker';
import { Container, SimpleGrid, GridItem, Text, Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';

type HomeProps = {
  data?: {
    title: RichTextBlock[];
    text: RichTextBlock[];
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
  };
  films: Film[];
  config?: Config;
};

const Home: NextRoute<HomeProps> = ({ data, films, config }) => (
  <Box maxW="100vw" overflow="hidden">
    <Container maxW="container.xl" pt={{ md: 16 }}>
      <SEO title={data?.seo_title} desc={data?.seo_desc} imageUrl={data?.seo_img?.url} />
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} alignItems="center">
        <GridItem gridRow={{ base: 2, lg: 'auto' }} color="pink.600">
          {data?.title && (
            <Text as="h1" fontSize="3xl" fontWeight="bold" letterSpacing="tight">
              {RichText.render(data.title)}
            </Text>
          )}
          {data?.text && (
            <Text fontSize="md">
              <RichText render={data.text} />
            </Text>
          )}
        </GridItem>
        <GridItem colSpan={2}>
          <FilmsFlicker films={orderFilms(films)} />
        </GridItem>
      </SimpleGrid>
    </Container>
    {config && <Footer {...config} />}
  </Box>
);

export const getStaticProps: GetStaticProps = async () => {
  const films = await getAllFilms();
  const { data } = await getPage('home');
  const { data: config } = await getPage('config');

  return {
    props: {
      data,
      films,
      config,
    },
    revalidate: 600,
  };
};

export default Home;
