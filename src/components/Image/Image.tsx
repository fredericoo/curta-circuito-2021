import { default as NextImage, ImageProps } from 'next/image';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';

type Props = { bg?: string } & ImageProps;

const Image: React.VFC<Props> = ({ bg, ...props }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Box bg={bg || 'gray.200'} sx={{ '&>*': { opacity: hasLoaded ? 1 : 0, transition: '.6s ease-out' } }}>
      <NextImage onLoadingComplete={() => setHasLoaded(true)} {...props} />
    </Box>
  );
};

export default Image;
