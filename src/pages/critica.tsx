import DiscoHeading from '@/components/DiscoHeading';
import Image from '@/components/Image';
import { getPage, resolveDocumentURL } from '@/lib/queries';
import { Config, PrismicImage, PrismicMediaLink } from '@/lib/types';
import { Box, Container, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Document } from '@prismicio/client/types/documents';
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

type Props = {
  data: Document['data'];
  config: Config;
};

const AboutPage: React.VFC<Props> = ({ data, config }) => {
  if (!data) return null;
  const pageTitle = data.title ? RichText.asText(data.title) : 'Cadernos de Crítica';
  return (
    <>
      <SEO title={data.seo_title} desc={data.seo_desc} imageUrl={data.seo_img?.url} />
      <Container maxW="container.xl">
        <Box py={16} textAlign="center">
          <DiscoHeading>{pageTitle}</DiscoHeading>
        </Box>
        <SimpleGrid columnGap={8} rowGap={16} columns={{ base: 1, md: 2, lg: 4 }}>
          {data.text && (
            <Box fontSize="md">
              <RichText render={data.text} />
            </Box>
          )}
          {data.review_book?.map((props: ReviewBookProps, i: number) => (
            <ReviewBook key={i} {...props} />
          ))}
        </SimpleGrid>
      </Container>
      {config && <Footer {...config} />}
    </>
  );
};

type ReviewBookProps = {
  image?: PrismicImage;
  year?: number;
  pdf?: PrismicMediaLink;
  audiobook?: PrismicMediaLink;
};
const ReviewBook: React.VFC<ReviewBookProps> = ({ image, year, pdf, audiobook }) => {
  const audiobookUrl = audiobook ? resolveDocumentURL(audiobook) : undefined;
  const pdfUrl = pdf ? resolveDocumentURL(pdf) : undefined;

  return (
    <Box>
      <Box display="flex" justifyContent="center" bg="pink.800" borderTopRadius="1rem" pt={8} px={8}>
        {image && (
          <Box mb={-8} borderRadius="1rem" overflow="hidden" w="80%">
            <Image
              src={image.url}
              width={image.dimensions?.width}
              height={image.dimensions?.height}
              alt={`Caderno de Crítica Curta Circuito ${year}`}
              layout="responsive"
              sizes="512px"
            />
          </Box>
        )}
      </Box>
      <Text mt={8} textAlign="center" as="h3" color="pink.600" fontSize="4xl">
        {year}
      </Text>
      <HStack spacing={4} justify="center">
        {audiobookUrl && (
          <Link href={audiobookUrl} passHref>
            <Button as="a" variant="secondary" target="_blank" referrerPolicy="no-referrer">
              Audiobook
            </Button>
          </Link>
        )}
        {pdfUrl && (
          <Link href={pdfUrl} passHref>
            <Button as="a" variant="primary" target="_blank" referrerPolicy="no-referrer">
              PDF
            </Button>
          </Link>
        )}
      </HStack>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPage('critica');
  const { data: config } = await getPage('config');
  return { props: { data, config }, revalidate: 600 };
};

export default AboutPage;
