import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from '@/components/Image';
import { PrismicImage, PrismicWebLink } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';

type CriticProps = {
  title?: RichTextBlock[];
  text?: RichTextBlock[];
  book?: PrismicWebLink;
  link?: PrismicWebLink;
  image?: PrismicImage;
};
const Critic: React.VFC<CriticProps> = ({ title, text, book, link, image }) => (
  <SimpleGrid columns={{ lg: 2 }} gap={8} pt={4} px={4} pb={8} bg="gray.200">
    <Box>
      {title && (
        <Text as="h3" color="pink.400" fontSize="2xl" mb={4} lineHeight="1.2">
          {RichText.asText(title)}
        </Text>
      )}
      <RichText render={text} />
    </Box>
    <Box>
      {image?.url && (
        <Image src={image.url} width={image.dimensions.width} height={image.dimensions.height} alt={image.alt} />
      )}
      <HStack wrap="wrap" justify="center" spacing={4} pt={8}>
        {link?.url && (
          <Link href={link.url} passHref>
            <Button variant="secondary" as="a" target="_blank" referrerPolicy="no-referrer">
              Audiobook
            </Button>
          </Link>
        )}
        {book?.url && (
          <Link href={book.url} passHref>
            <Button variant="primary" as="a" target="_blank" referrerPolicy="no-referrer">
              PDF
            </Button>
          </Link>
        )}
      </HStack>
    </Box>
  </SimpleGrid>
);

export default Critic;
