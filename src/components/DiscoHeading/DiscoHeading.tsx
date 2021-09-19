import shadows from '@/styles/shadows';
import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type Props = {
  children: string;
};

const MotionText = motion(Text);

const DiscoHeading: React.VFC<Props> = ({ children }) => (
  <MotionText
    fontWeight="800"
    textTransform="uppercase"
    fontSize="3.75rem"
    lineHeight="1"
    letterSpacing="-0.04em"
    textShadow={shadows.discoOff}
    color="gray.900"
    initial={{
      textShadow: shadows.discoOff,
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
    animate={{
      textShadow: shadows.disco,
      transform: 'translateY(-.3em)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}
    exit={{
      textShadow: shadows.discoOff,
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
  >
    {children}
  </MotionText>
);

export default DiscoHeading;
