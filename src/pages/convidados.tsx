import DiscoHeading from '@/components/DiscoHeading';
import { getPage, resolveDocumentURL } from '@/lib/queries';
import { Config, NextRoute, PrismicDocumentLink, PrismicImage } from '@/lib/types';
import { Box, Container, SimpleGrid } from '@chakra-ui/layout';
import { styled, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from '@/components/Image';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import Link from 'next/link';
import FilmText from '@/components/FilmText';

type Reviewer = { image: PrismicImage; name: RichTextBlock[]; bio: RichTextBlock[] };
type Props = {
  data: {
    title: RichTextBlock[];
    section_title: RichTextBlock[];
    bonustrack: RichTextBlock[];
    text: RichTextBlock[];
    section_text: RichTextBlock[];
    guests: {
      image: PrismicImage;
      name: RichTextBlock[];
      bio: RichTextBlock[];
      cta: string;
      link: PrismicDocumentLink & { data: { title: RichTextBlock[] } };
    }[];
    reviewer: Reviewer[];
    profile: Reviewer[];
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
  };
  config?: Config;
};

const AboutPage: NextRoute<Props> = ({ data, config }) => {
  if (!data) return null;

  return (
    <Box overflow="hidden">
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Container maxW="container.xl" fontSize="md">
        <Box py={16} textAlign="center">
          <DiscoHeading>{data.bonustrack ? RichText.asText(data.bonustrack) : 'Bonus Track'}</DiscoHeading>
          {data.text && (
            <Box maxW="33ch" mx="auto">
              <RichText render={data.text} />
            </Box>
          )}
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} columnGap={8} rowGap={16}>
          {data.guests?.map((props, i) => (
            <ReviewerBox bg="blue.600" key={i} {...props} />
          ))}
        </SimpleGrid>
      </Container>
      <Container maxW="container.xl" fontSize="md">
        <Box py={16} textAlign="center">
          <DiscoHeading>{data.section_title ? RichText.asText(data.section_title) : 'Musimágicos'}</DiscoHeading>
          {data.section_text && (
            <Box maxW="33ch" mx="auto">
              <RichText render={data.section_text} />
            </Box>
          )}
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} columnGap={8} rowGap={16}>
          {data.profile?.map((props, i) => (
            <ReviewerBox bg="yellow.800" key={i} {...props} />
          ))}
        </SimpleGrid>
      </Container>

      <Container maxW="container.xl" fontSize="md">
        <Box py={16} textAlign="center">
          <DiscoHeading>{data.title ? RichText.asText(data.title) : 'Sobre'}</DiscoHeading>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} columnGap={8} rowGap={16}>
          {data.reviewer?.map((props, i) => (
            <ReviewerBox bg="purple.600" key={i} {...props} />
          ))}
        </SimpleGrid>
      </Container>
      {config && <Footer {...config} />}
    </Box>
  );
};

const ReviewerBox: React.VFC<
  Reviewer & { bg: string; link?: PrismicDocumentLink & { data: { title: RichTextBlock[] } }; cta?: string }
> = ({ image, name, bio, bg, link, cta }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="center" bg={bg} borderTopRadius="1rem" pt={8} px={8}>
        {image && (
          <Box mb={-8} borderRadius="1rem" overflow="hidden" w="80%">
            <Image
              src={image.url}
              width={image.dimensions?.width}
              height={image.dimensions?.height}
              alt={RichText.asText(name)}
              layout="responsive"
              sizes="512px"
            />
          </Box>
        )}
      </Box>
      <Text fontFamily="condensed" textTransform="uppercase" fontWeight="bold" fontSize="xl" mt={10} as="h3">
        {RichText.asText(name)}
      </Text>
      <BodyText fontSize="1rem">
        <RichText render={bio} />
      </BodyText>
      {cta && link?.uid && (
        <FilmText label={cta}>
          <Link href={resolveDocumentURL(link)} passHref>
            <Text as="a" color={bg}>
              {RichText.asText(link.data.title)}
            </Text>
          </Link>
        </FilmText>
      )}
    </Box>
  );
};

const BodyText = styled(Box, { baseStyle: { fontSize: '1rem' } });
BodyText.defaultProps = { sx: { a: { color: 'pink.400', _hover: { color: 'pink.800' } } } };

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPage('guests', { fetchLinks: 'filme.title' });
  const { data: config } = await getPage('config');

  return { props: { data, config }, revalidate: 600 };
};

export default AboutPage;
