import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film } from '@/lib/types';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Box, SimpleGrid, VStack } from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticProps } from 'next';

type FilmPageProps = {
  film: Film;
};

const tabs = [
  { label: 'Trailer', children: <div /> },
  { label: 'Crítica', children: <div /> },
  { label: 'Bate papo', children: <div /> },
  { label: 'Fotos', children: <div /> },
];

const FilmPage: React.VFC<FilmPageProps> = ({ film }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} minH="100vh" bg="gray.100">
      <Box>
        <VStack bg={film.bgColor?.replace('-', '.')} p={8}>
          <Box w="350px" h="350px" bg="white" borderRadius="xl" mb="-4rem" />
        </VStack>
      </Box>

      <Accordion bg="gray.200">
        {tabs.map(({ label, children }) => (
          <AccordionItem bg="gray.100" key={label}>
            <AccordionButton>{label}</AccordionButton>
            <AccordionPanel>{children}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </SimpleGrid>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getFilmSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string')
    return { props: { film: undefined }, revalidate: 600 };

  const film = await getFilmBySlug(params.slug);
  return {
    props: { film },
    revalidate: 600,
  };
};

export default FilmPage;
