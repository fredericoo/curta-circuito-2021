import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film } from '@/lib/types';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box, SimpleGrid, VStack, HStack, Button, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Album from '@/components/Album';
import Image from '@/components/Image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';
import Carousel from '@/components/Carousel/Carousel';
import Critic from '@/components/Critic';
import FilmText from '@/components/FilmText';
import TimeCounter from '@/components/TimeCounter';
import useSeconds from '@/lib/useSeconds';
import { isAfter } from 'date-fns';
import SEO from '@/components/SEO';

type FilmPageProps = {
  film: Film;
};

const FilmPage: React.VFC<FilmPageProps> = ({ film: { data } }) => {
  const { back } = useRouter();
  const now = useSeconds();
  const today = new Date();
  const hasStarted = !data.startdate || !isAfter(new Date(data.startdate), today);
  const hasEnded = !!data.enddate && !isAfter(new Date(data.enddate), today);

  const tabs = [
    { label: 'Trailer', children: <div /> },
    { label: 'Crítica', children: <Critic /> },
    { label: 'Bate papo', children: <div /> },
  ];

  data.carousel &&
    tabs.push({ label: 'Fotos', children: <Carousel photos={data.carousel.map(({ image }) => image)} /> });

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
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
        <VStack align="flex-start" spacing={8} p={8} color="gray.900" fontSize="md">
          {data.title && (
            <Text
              as="h1"
              fontSize="6xl"
              fontWeight="bold"
              letterSpacing="tight"
              textTransform="uppercase"
              lineHeight="1"
            >
              <RichText render={data.title} />
            </Text>
          )}
          <Box>
            <RichText render={data.description} />
          </Box>
          <Box>
            {data.director && <FilmText label="Direção">{data.director}</FilmText>}{' '}
            {data.year && <FilmText label="Ano">{data.year}</FilmText>}{' '}
            {data.duration && <FilmText label="Dur.">{data.duration}’</FilmText>}{' '}
          </Box>

          {!hasStarted && data.startdate && (
            <Box whiteSpace="nowrap">
              <FilmText label="Disponível em" />
              <TimeCounter from={now} to={new Date(data.startdate)} />
            </Box>
          )}
          {hasStarted && !hasEnded && data.enddate && (
            <Box whiteSpace="nowrap">
              <FilmText label="Disponível por" />
              <TimeCounter from={new Date(data.enddate)} to={now} />
            </Box>
          )}
        </VStack>
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
