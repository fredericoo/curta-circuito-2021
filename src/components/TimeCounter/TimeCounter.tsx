import { Box, SimpleGrid, Text } from '@chakra-ui/layout';
import { differenceInDays, differenceInSeconds } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  from: Date;
  to: Date;
};
const TimeCounter: React.VFC<Props> = ({ from, to }) => {
  const daysTo = Math.abs(differenceInDays(from, to));
  if (daysTo > 1) return <Text>{daysTo} dias</Text>;

  const secsTo = Math.abs(differenceInSeconds(from, to));
  const [hours, minutes, seconds] = [
    Math.floor(secsTo / 3600)
      .toString()
      .padStart(2, '0'),
    Math.floor((secsTo % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    (secsTo % 60).toString().padStart(2, '0'),
  ];
  return (
    <Text fontWeight="bold">
      <Clock>{hours}</Clock> : <Clock>{minutes}</Clock> :{' '}
      <Clock>{seconds}</Clock>
    </Text>
  );
};

const variants = {
  initial: {
    transform: 'translateY(100%)',
  },
  animate: {
    transform: 'translateY(0%)',
    transition: { duration: 0.3 },
  },
  exit: {
    transform: 'translateY(-100%)',
    transition: { duration: 0.3 },
  },
};

const MotionBox = motion(Box);
const Clock: React.VFC<{ children: string }> = ({ children }) => {
  return (
    <SimpleGrid
      columns={children.length}
      gap="2px"
      overflow="hidden"
      display="inline-grid"
    >
      <AnimatePresence>
        {children.split('').map((letter, i) => (
          <MotionBox
            gridColumnStart={i + 1}
            gridColumnEnd={i + 2}
            gridRow="1/1"
            key={`${letter}-${i}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            bg="black"
            color="white"
            px={1}
            borderRadius="md"
          >
            {letter}
          </MotionBox>
        ))}
      </AnimatePresence>
    </SimpleGrid>
  );
};

export default TimeCounter;
