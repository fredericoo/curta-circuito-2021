import DiscoHeading from '@/components/DiscoHeading';
import FilmText from '@/components/FilmText';
import { getPage } from '@/lib/queries';
import { Config, PrismicImage, PrismicMediaLink } from '@/lib/types';
import { Box, Container, SimpleGrid } from '@chakra-ui/layout';
import { styled, VStack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from '@/components/Image';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';

type Props = {
  data: {
    title: RichTextBlock[];
    contacttitle: RichTextBlock[];
    text: RichTextBlock[];
    author: { role: string; name: string }[];
    sticker_images: { image: PrismicImage }[];
    stickers?: { image: PrismicImage }[];
    teaser?: PrismicMediaLink;
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
    contact?: { detail?: RichTextBlock[]; type?: string }[];
  };
  config?: Config;
};

const MotionBox = motion(Box);

const AboutPage: React.VFC<Props> = ({ data, config }) => {
  if (!data) return null;

  const rightSticker = data.sticker_images[0].image;
  const leftSticker = data.sticker_images[1].image;

  const leftBottomSticker = data.stickers?.[0].image;
  const rightBottomSticker = data.stickers?.[1].image;

  return (
    <Box overflow="hidden">
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Container maxW="container.xl" fontSize="md">
        <SimpleGrid columns={{ base: 1, md: 12 }} gap={8}>
          <Box gridColumn={{ md: '1/2', lg: '1/3' }} alignSelf="center">
            {leftSticker?.url && (
              <MotionBox drag whileHover={{ scale: 1.05 }} whileDrag={{ scale: 1.1 }} dragMomentum={false}>
                <Box pointerEvents="none" transform={`rotate(-15deg)`}>
                  <Image
                    bg="transparent"
                    src={leftSticker.url}
                    width={leftSticker.dimensions.width}
                    height={leftSticker.dimensions.height}
                    alt={leftSticker.alt}
                  />
                </Box>
              </MotionBox>
            )}
          </Box>
          <VStack align="initial" spacing={8} py={16} gridColumn={{ md: '2 / 10', lg: '3 / 9' }}>
            <DiscoHeading textAlign={{ base: 'center', md: 'left' }}>
              {data.title ? RichText.asText(data.title) : 'Sobre'}
            </DiscoHeading>
            <Box>
              {data.author?.map(({ role, name }) => (
                <FilmText key={name} label={role}>
                  {name}
                </FilmText>
              ))}
            </Box>
            <RichText render={data.text} />
          </VStack>
          <Box pt={16} w={{ base: '80%', md: 'auto' }} gridColumn={{ md: '10/13', lg: '9/13' }}>
            {rightSticker?.url && (
              <MotionBox
                w="80%"
                ml="auto"
                mb={8}
                drag
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1 }}
                dragMomentum={false}
              >
                <Box pointerEvents="none" transform={`rotate(15deg)`}>
                  <Image
                    src={rightSticker.url}
                    width={rightSticker.dimensions.width}
                    height={rightSticker.dimensions.height}
                    alt={rightSticker.alt}
                  />
                </Box>
              </MotionBox>
            )}
            {data.teaser?.url && (
              <MotionBox
                drag
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1 }}
                dragMomentum={false}
                border="20px solid"
                borderColor="beige"
              >
                <VideoPlayer src={data.teaser.url} width={1920} height={1080} videoProps={{ controls: true }} />
              </MotionBox>
            )}
          </Box>

          {leftBottomSticker?.url && (
            <MotionBox
              drag
              gridColumn={{ md: '2/5' }}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1 }}
              dragMomentum={false}
            >
              <Box pointerEvents="none" transform={`rotate(-15deg)`}>
                <Image
                  src={leftBottomSticker.url}
                  width={leftBottomSticker.dimensions.width}
                  height={leftBottomSticker.dimensions.height}
                  alt={leftBottomSticker.alt}
                />
              </Box>
            </MotionBox>
          )}

          <Box pt={16} gridColumn={{ md: '6/10' }}>
            <DiscoHeading textAlign={{ base: 'center', md: 'left' }}>
              {data.contacttitle ? RichText.asText(data.contacttitle) : 'Contato'}
            </DiscoHeading>
            <SimpleGrid columns={2} rowGap={4} pt={8} gridTemplateColumns="1fr 3fr">
              {data.contact?.map(({ detail, type }) => (
                <FilmText key={type} label={type || ''}>
                  {detail && <RichText render={detail} />}
                </FilmText>
              ))}
            </SimpleGrid>
          </Box>

          {rightBottomSticker?.url && (
            <MotionBox
              drag
              gridColumn={{ md: '10/13' }}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1 }}
              dragMomentum={false}
            >
              <Box pointerEvents="none" transform={`rotate(30deg)`}>
                <Image
                  src={rightBottomSticker.url}
                  width={rightBottomSticker.dimensions.width}
                  height={rightBottomSticker.dimensions.height}
                  alt={rightBottomSticker.alt}
                  bg="transparent"
                />
              </Box>
            </MotionBox>
          )}
        </SimpleGrid>
      </Container>
      {config && <Footer {...config} />}
    </Box>
  );
};

const BodyText = styled(Box, { baseStyle: { fontSize: '1rem' } });
BodyText.defaultProps = { sx: { a: { color: 'pink.400', _hover: { color: 'pink.800' } } } };

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPage('sobre');
  const { data: config } = await getPage('config');

  return { props: { data, config }, revalidate: 600 };
};

export default AboutPage;
