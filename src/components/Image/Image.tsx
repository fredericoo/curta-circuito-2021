import { default as NextImage, ImageProps } from 'next/image';
import { Box } from '@chakra-ui/react';

type Props = { bg?: string } & ImageProps;

const Image: React.VFC<Props> = ({ bg, ...props }) => {
  return (
    <Box bg={bg || 'gray.200'}>
      <NextImage {...props} />
    </Box>
  );
};

export default Image;
