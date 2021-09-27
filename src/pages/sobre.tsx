import DiscoHeading from '@/components/DiscoHeading';
import FilmText from '@/components/FilmText';
import { getPage } from '@/lib/queries';
import { Config, PrismicImage } from '@/lib/types';
import { Box, Container, SimpleGrid } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

type Reviewer = { image: PrismicImage; name: RichTextBlock[]; bio: RichTextBlock[] };
type Props = {
  data: {
    title: RichTextBlock[];
    text: RichTextBlock[];
    author: { role: string; name: string }[];
    reviewer: Reviewer[];
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
  };
  config: Config;
};

const AboutPage: React.VFC<Props> = ({ data, config }) => {
  if (!data) return null;
  return (
    <>
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Container maxW="container.xl" fontSize="md">
        <Box py={16} textAlign="center">
          <DiscoHeading>{data.title ? RichText.asText(data.title) : 'Sobre'}</DiscoHeading>
        </Box>
        {data.author?.map(({ role, name }) => (
          <FilmText key={name} label={role}>
            {name}
          </FilmText>
        ))}
        <RichText render={data.text} />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {data.reviewer?.map((props, i) => (
            <ReviewerBox key={i} {...props} />
          ))}
        </SimpleGrid>
      </Container>
      <Footer {...config} />
    </>
  );
};

const ReviewerBox: React.VFC<Reviewer> = ({ image, name, bio }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="center" bg="purple.600" borderTopRadius="1rem" pt={8} px={8}>
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
      <Box fontSize="1rem">
        <RichText render={bio} />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPage('sobre');
  const { data: config } = await getPage('config');

  return { props: { data, config }, revalidate: 600 };
};

export default AboutPage;
