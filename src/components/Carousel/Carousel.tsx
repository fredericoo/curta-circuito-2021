import { PrismicImage } from '@/lib/types';
import { Box } from '@chakra-ui/layout';
import Image from '../Image';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
// import { useState } from 'react';

type Props = {
  photos: PrismicImage[];
};

const Carousel: React.VFC<Props> = ({ photos }) => {
  // const [flickity, setFlickity] = useState<Flickity>();

  return (
    <Box bg="black">
      <Flickity
        // flickityRef={setFlickity}
        options={{ cellAlign: 'center', prevNextButtons: false }}
        reloadOnUpdate
        disableImagesLoaded
      >
        {photos
          .filter((photo) => photo.url)
          .map((photo, index) => (
            <Box key={index} w="80%" minH="100%" p={4} display="flex" alignItems="center" justifyContent="center">
              <Image
                src={photo.url}
                width={photo.dimensions?.width}
                height={photo.dimensions?.height}
                alt={photo.alt}
                layout="intrinsic"
              />
            </Box>
          ))}
      </Flickity>
    </Box>
  );
};

export default Carousel;
