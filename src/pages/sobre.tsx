import DiscoHeading from '@/components/DiscoHeading';
import FilmText from '@/components/FilmText';
import { getPage } from '@/lib/queries';
import { Config, PrismicImage } from '@/lib/types';
import { Box, Container, SimpleGrid } from '@chakra-ui/layout';
import { styled, VStack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from '@/components/Image';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

type Props = {
  data: {
    title: RichTextBlock[];
    text: RichTextBlock[];
    author: { role: string; name: string }[];
    sticker_images: { image: PrismicImage }[];
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
  };
  config?: Config;
};

const MotionBox = motion(Box);

const AboutPage: React.VFC<Props> = ({ data, config }) => {
  if (!data) return null;
  const image = data.sticker_images[2]?.image;

  return (
    <Box overflow="hidden">
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Container maxW="container.xl" fontSize="md">
        <SimpleGrid columns={{ base: 1, md: 12 }}>
          <Box gridColumn={{ md: '1/2', lg: '1/2' }} alignSelf="center">
            {image?.url && (
              <MotionBox drag whileHover={{ scale: 1.05 }} whileDrag={{ scale: 1.1 }} dragMomentum={false}>
                <Box pointerEvents="none" transform={`rotate(-15deg)`}>
                  <Image
                    bg="transparent"
                    src={image.url}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    alt={image.alt}
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
          <Box pt={16} w={{ base: '80%', md: 'auto' }} gridColumn={{ md: '10/13', lg: '10/13' }}>
            {data.sticker_images?.slice(0, 2)?.map(({ image }, i) => (
              <MotionBox drag whileHover={{ scale: 1.05 }} whileDrag={{ scale: 1.1 }} dragMomentum={false} key={i}>
                <Box pointerEvents="none" transform={!!i ? `rotate(15deg)` : `rotate(-15deg)`}>
                  <Image
                    src={image.url}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    alt={image.alt}
                  />
                </Box>
              </MotionBox>
            ))}
          </Box>
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
