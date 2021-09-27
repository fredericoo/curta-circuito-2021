import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film } from '@/lib/types';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box, SimpleGrid, VStack, HStack, Button } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Album from '@/components/Album';
import Image from '@/components/Image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';
import Carousel from '@/components/Carousel/Carousel';
import Critic from '@/components/Critic';

type FilmPageProps = {
  film: Film;
};

const FilmPage: React.VFC<FilmPageProps> = ({ film: { data } }) => {
  const { back } = useRouter();
  const tabs = [
    { label: 'Trailer', children: <div /> },
    { label: 'Crítica', children: <Critic /> },
    { label: 'Bate papo', children: <div /> },
  ];

  data.carousel &&
    tabs.push({ label: 'Fotos', children: <Carousel photos={data.carousel.map(({ image }) => image)} /> });

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <Box>
        <VStack bg={data.bgcolor?.replace('-', '.')} p={8}>
          <HStack justify="flex-start" w="100%">
            <Button onClick={back}>←</Button>
          </HStack>
          <Album w="350px" h="350px" bg="white">
            {data.cover && (
              <Image
                src={data.cover.url}
                width={data.cover.dimensions.width}
                height={data.cover.dimensions.height}
                layout="responsive"
                alt={data.cover?.alt}
                sizes="512px"
              />
            )}
          </Album>
        </VStack>
        {data.title && <RichText render={data.title} />}
      </Box>

      <Accordion bgImage={`url(${data.image?.url})`} bgSize="50vw auto" bgAttachment="fixed">
        {tabs.map(({ label, children }) => (
          <AccordionItem key={label} bg="gray.100" borderColor={data.tableColor}>
            <AccordionButton>{label}</AccordionButton>
            <AccordionPanel p={0}>{children}</AccordionPanel>
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
