import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Image from '@/components/Image';
import { PrismicImage, PrismicWebLink } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';

type InterviewProps = {
  title?: RichTextBlock[];
  text?: RichTextBlock[];
  image?: PrismicImage;
  spotify?: PrismicWebLink;
  youtube?: PrismicWebLink;
};

const Interview: React.VFC<InterviewProps> = ({ title, text, image, youtube, spotify }) => {
  return (
    <SimpleGrid columns={{ lg: 2 }} gap={8} pt={4} px={4} pb={8} bg="gray.200">
      <Box>
        {title && (
          <Text as="h3" color="pink.400" fontSize="3xl" mb={4} lineHeight="1.2">
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
          {spotify?.url && (
            <Link href={spotify.url} passHref>
              <Button variant="secondary" as="a" target="_blank" referrerPolicy="no-referrer">
                Spotify
              </Button>
            </Link>
          )}
          {youtube?.url && (
            <Link href={youtube.url} passHref>
              <Button variant="secondary" as="a" target="_blank" referrerPolicy="no-referrer">
                Youtube
              </Button>
            </Link>
          )}
        </HStack>
      </Box>
    </SimpleGrid>
  );
};
export default Interview;
