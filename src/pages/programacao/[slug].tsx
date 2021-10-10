import { getFilmBySlug, getFilmSlugs } from '@/lib/queries';
import { Film, NextRoute } from '@/lib/types';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box, SimpleGrid, VStack, HStack, Button, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from '@/components/Image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';
import Carousel from '@/components/Carousel/Carousel';
import Critic from '@/components/FilmTabs/Critic';
import Trailer from '@/components/FilmTabs/Trailer';
import FilmText from '@/components/FilmText';
import SEO from '@/components/SEO';
import Interview from '@/components/FilmTabs/Interview';
import FilmAvailability from '@/components/FilmAvailability';
import vinyl from '../../../public/img/vinyl.png';
import { motion } from 'framer-motion';

type FilmPageProps = {
  film: Film;
};

const MotionBox = motion(Box);

const FilmPage: NextRoute<FilmPageProps> = ({ film }) => {
  const { back } = useRouter();
  const data = film.data;
  const tabs = [];

  data.trailer?.url &&
    tabs.push({ label: 'Trailer', children: <Trailer src={data.trailer?.url} width={1920} height={1080} /> });
  data.review_text &&
    tabs.push({
      label: 'Crítica',
      children: (
        <Critic
          title={data.review_title}
          text={data.review_text}
          link={data.review_link}
          book={data.review_book}
          image={data.cover}
        />
      ),
    });
  data.interview_text &&
    tabs.push({
      label: 'Bate papo',
      children: (
        <Interview
          title={data.interview_title}
          text={data.interview_text}
          image={data.interview_image}
          spotify={data.interview_spotify}
          youtube={data.interview_youtube}
        />
      ),
    });
  data.carousel &&
    tabs.push({ label: 'Fotos', children: <Carousel photos={data.carousel.map(({ image }) => image)} /> });

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="100%" overflow="hidden">
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Box>
        <Box bg={data.bgcolor} p={8}>
          <HStack justify="flex-start" w="100%" pb={8}>
            <Button onClick={back}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8.5L2 8.5M2 8.5L8.5 2M2 8.5L8.5 15" stroke="black" strokeLinecap="round" />
              </svg>
            </Button>
          </HStack>
          <Box
            w={{ base: '200px', md: '350px' }}
            h={{ base: '200px', md: '350px' }}
            mb={-16}
            mx="auto"
            position="relative"
          >
            {data.cover && (
              <Box position="absolute" w="100%" h="100%" borderRadius="5%" overflow="hidden" zIndex="2">
                <Image
                  src={data.cover.url}
                  width={data.cover.dimensions.width}
                  height={data.cover.dimensions.height}
                  layout="responsive"
                  alt={data.cover?.alt}
                  sizes="512px"
                />
              </Box>
            )}
            <MotionBox
              initial={{ transform: 'none' }}
              animate={{ transform: 'translateX(33%)', transition: { delay: 1 } }}
              position="absolute"
              top="0"
              w="100%"
              h="100%"
              borderRadius="full"
              zIndex="1"
            >
              <Image src={vinyl} placeholder="blur" alt="" layout="responsive" bg="transparent" />
            </MotionBox>
          </Box>
        </Box>
        <VStack align="flex-start" spacing={8} p={8} pt={16} color="gray.900" fontSize="md">
          <SimpleGrid gap={8} columns={{ xl: 3 }}>
            <Box gridColumn={{ xl: '1/3' }}>
              {data.title && (
                <Text
                  as="h1"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="bold"
                  letterSpacing="tighter"
                  textTransform="uppercase"
                  lineHeight="1"
                  mb={4}
                >
                  {RichText.asText(data.title)}
                </Text>
              )}
              <RichText render={data.description} />
            </Box>
            <Box display="flex" justifyContent={{ xl: 'flex-end' }}>
              <FilmAvailability
                startdate={data?.startdate}
                enddate={data.enddate}
                watchUrl={`/programacao/${film.uid}/assistir`}
              />
            </Box>
          </SimpleGrid>
          <Box>
            {data.director && <FilmText label="Direção">{data.director}</FilmText>}{' '}
            {data.year && <FilmText label="Ano">{data.year}</FilmText>}{' '}
            {data.duration && <FilmText label="Dur.">{data.duration}’</FilmText>}{' '}
          </Box>
        </VStack>
      </Box>

      <Accordion
        bgImage={`url(${data.image?.url})`}
        bgSize="50vw auto"
        bgAttachment="fixed"
        defaultIndex={0}
        pb={{ base: 32, md: 8 }}
      >
        {tabs.map(({ label, children }) => (
          <AccordionItem key={label} bg="gray.100" _first={{ borderTop: 'none' }} borderColor={data.tablecolor}>
            <AccordionButton p={4} fontSize="xl" _expanded={{ bg: 'gray.200' }}>
              {label}
            </AccordionButton>
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
