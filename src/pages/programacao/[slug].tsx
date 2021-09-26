import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film } from '@/lib/types';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box, SimpleGrid, VStack, HStack, Button } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Album from '@/components/Album';
import Image from '@/components/Image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

type FilmPageProps = {
  film: Film;
};

const tabs = [
  { label: 'Trailer', children: <div /> },
  { label: 'Crítica', children: <div /> },
  { label: 'Bate papo', children: <div /> },
  { label: 'Fotos', children: <div /> },
];

const FilmPage: React.VFC<FilmPageProps> = ({ film: { data } }) => {
  const { back } = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} minH="100vh" bg="gray.100">
      <Box>
        <VStack bg={data.bgcolor?.replace('-', '.')} p={8}>
          <HStack justify="flex-start" w="100%">
            <Button onClick={back}>←</Button>
          </HStack>
          <Album w="350px" h="350px" bg="white" borderRadius="xl" overflow="hidden">
            {data.cover && (
              <Image
                src={data.cover.url + '?v=5'}
                width={data.cover.dimensions.width}
                height={data.cover.dimensions.height}
                layout="responsive"
                alt={data.cover?.alt}
                sizes="(max-width: 600px) 100vw, 600px"
              />
            )}
          </Album>
        </VStack>
        {data.title && <RichText render={data.title} />}
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
  if (!params || typeof params.slug !== 'string') return { props: { film: null }, revalidate: 600 };

  const film = (await getFilmBySlug(params.slug)) || null;
  return {
    props: { film },
    revalidate: 600,
  };
};

export default FilmPage;
