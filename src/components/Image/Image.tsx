import { default as NextImage, ImageProps } from 'next/image';
import { Box } from '@chakra-ui/react';

type Props = ImageProps;

const Image: React.VFC<Props> = (props) => {
  return (
    <Box bg="gray.200">
      <NextImage {...props} />
    </Box>
  );
};

export default Image;
