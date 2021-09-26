import { Box } from '@chakra-ui/layout';
import { styled } from '@chakra-ui/system';
import { motion } from 'framer-motion';

export const MotionBox = motion(Box);
const Album = styled(MotionBox, {
  baseStyle: {
    borderRadius: 'xl',
    transformOrigin: 'left center',
    overflow: 'hidden',
  },
});

export default Album;
