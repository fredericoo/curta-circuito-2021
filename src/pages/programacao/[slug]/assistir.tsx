import NavbarPlayer from '@/components/Navbar/NavbarPlayer';
import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film, NextRoute } from '@/lib/types';
import { Box, Container, Text } from '@chakra-ui/layout';
import { isAfter } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-reactjs';

type FilmPageProps = {
  film: Film;
};

const PlayerPage: NextRoute<FilmPageProps> = ({ film }) => {
  const data = film.data;
  const { startdate, enddate } = film.data;
  const today = new Date();
  const hasStarted = !startdate || !isAfter(new Date(startdate), today);
  const hasEnded = !!enddate && !isAfter(new Date(enddate), today);

  return (
    <Box bg="gray.800" color="gray.100" pt={24} minH="100vh">
      {!hasStarted || hasEnded ? (
        <Container maxW="container.xl" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase">
            Tem nada aqui não, broto.
          </Text>
          <Text fontSize="md">
            O link que você está tentando acessar não está disponível, porque o filme pode ter expirado ou não iniciado
            ainda.
          </Text>
        </Container>
      ) : (
        <>
          <Container maxW="container.xl">
            {data.player && <Box dangerouslySetInnerHTML={{ __html: data.player }} />}
          </Container>
          <Container maxW="container.xl" py={8}>
            {data.title && (
              <Box>
                <Text>Você está assistindo</Text>
                <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase">
                  {RichText.asText(data.title)}
                </Text>
              </Box>
            )}
          </Container>
        </>
      )}
    </Box>
  );
};

PlayerPage.Navbar = NavbarPlayer;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getFilmSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') return { props: { film: null }, revalidate: 600 };

  const film = (await getFilmBySlug(params.slug)) || null;
  return {
    props: { film },
    revalidate: 600,
  };
};

export default PlayerPage;
