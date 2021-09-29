import { PrismicImage } from '@/lib/types';
import { Box } from '@chakra-ui/layout';
import Image from '../Image';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
import { useEffect } from 'react';
import { useState } from 'react';

type Props = {
  photos: PrismicImage[];
};

const Carousel: React.VFC<Props> = ({ photos }) => {
  const [flickity, setFlickity] = useState<Flickity>();
  useEffect(() => {
    flickity?.resize();
  }, [flickity]);

  return (
    <Box bg="black">
      <Flickity
        flickityRef={(flkty) => setTimeout(() => setFlickity(flkty), 1000)}
        options={{ cellAlign: 'center', prevNextButtons: false, pageDots: false }}
        disableImagesLoaded
      >
        {photos
          .filter((photo) => photo.url)
          .map((photo, index) => (
            <Box key={index} w="80%" mx={4} my={4} h={{ base: '80vh', lg: '40vh' }} borderRadius="xl" overflow="hidden">
              <Image src={photo.url} alt={photo.alt} layout="fill" objectFit="contain" />
            </Box>
          ))}
      </Flickity>
    </Box>
  );
};

export default Carousel;
