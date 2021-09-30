import { PrismicImage } from '@/lib/types';
import { Box, Text, SimpleGrid } from '@chakra-ui/layout';
import Image from '../Image';
import { useMemo, useState } from 'react';
import { AnimateSharedLayout, motion, PanInfo } from 'framer-motion';

type Props = {
  photos: PrismicImage[];
};

const MotionBox = motion(Box);
const MotionGrid = motion(SimpleGrid);

const Carousel: React.VFC<Props> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const wrap = useMemo(() => {
    const wrap = photos.slice(Math.max(0, selectedIndex - 1), selectedIndex + 2);
    return wrap.filter(Boolean);
  }, [photos, selectedIndex]);

  return (
    <Box bg="black" py={8} overflow="hidden">
      <MotionGrid
        columns={3}
        w="200%"
        h="40vh"
        gap={4}
        gridTemplateColumns="1fr 1fr 1fr"
        transform={`translateX(-${25 - offset / 100}%)`}
        userSelect="none"
        onPan={(_: MouseEvent, { offset }: PanInfo) => {
          setOffset(offset.x);
        }}
        onPanEnd={(_: MouseEvent, { offset }: PanInfo) => {
          if (offset.x > 0) {
            setSelectedIndex(Math.max(0, selectedIndex - 1));
          } else {
            setSelectedIndex(Math.min(photos.length - 1, selectedIndex + 1));
          }
          setOffset(0);
        }}
        sx={{ touchAction: 'none' }}
        transition={{ ease: 'linear', duration: 0 }}
      >
        <AnimateSharedLayout>
          {selectedIndex === 0 && <div />}
          {wrap.map((photo) => {
            const currentIndex = photos.findIndex((slide) => slide.url == photo.url);
            const isCurrent = currentIndex === selectedIndex;
            return (
              <MotionBox
                layoutId={photo.url}
                key={photo.url}
                borderRadius="xl"
                overflow="hidden"
                bg="#222222"
                exit={{ transform: 'translateX(100%)' }}
                opacity={isCurrent ? 1 : 0.4}
                _hover={{ opacity: 1 }}
                onClick={() => setSelectedIndex(currentIndex)}
                zIndex={isCurrent ? 2 : 1}
                transition={{ ease: 'easeOut', duration: 0.6 }}
                sx={{ '&>*': { pointerEvents: 'none' } }}
              >
                <Box
                  position="relative"
                  w="100%"
                  h="100%"
                  transform={
                    isCurrent ? 'translateX(0%)' : currentIndex > selectedIndex ? 'translateX(25%)' : 'translateX(-25%)'
                  }
                  transition=".6s ease-out"
                >
                  <Image src={photo.url} alt={photo.alt} layout="fill" objectFit="contain" />
                </Box>
              </MotionBox>
            );
          })}
        </AnimateSharedLayout>
      </MotionGrid>
      <Text color="white" textAlign="center" pt={4}>
        {selectedIndex + 1} / {photos.length}
      </Text>
    </Box>
  );
};

export default Carousel;
