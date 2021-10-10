import { Box } from '@chakra-ui/layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Film } from '@/lib/types';
import Image from '@/components/Image';
import Album from '@/components/Album';
import { RichText } from 'prismic-reactjs';
import vinyl from '../../../public/img/vinyl.png';
import { isAfter } from 'date-fns';

type VariantCallback = (args: {
  direction: number;
  index: number;
  albumCount: number;
}) => Record<string, string | number>;

const variants: Record<string, VariantCallback> = {
  enter: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 0 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount + 1 - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 0 - index)}%) translateZ(30px) scale(1)`,
    opacity: 0,
  }),
  visible: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 1 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 1 - index)}%) translateZ(30px) scale(1)`,
    opacity: 1,
  }),
  tap: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 1 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 1 - index) - 20}%) translateZ(30px) scale(1)`,
    opacity: 1,
  }),
  hold: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 1 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 1 - index)}%) translateZ(30px) scale(0.95)`,
    opacity: 1,
  }),
  exit: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 2 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - 1 - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 2 - index)}%) translateZ(30px) scale(1)`,
    opacity: 0,
  }),
};

type Props = {
  albums: Film[];
  albumCount: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const autoFlickDelay = 15000;

const MotionBox = motion(Box);
const AutoFlickBar = () => {
  return (
    <MotionBox
      position="absolute"
      display="block"
      height="4px"
      bg="white"
      top="5%"
      left="5%"
      zIndex={2}
      borderRadius="2px"
      initial={{ width: '0%' }}
      animate={{ width: '90%', transition: { ease: 'linear', duration: autoFlickDelay / 1000 } }}
    />
  );
};

const AlbumFlicker: React.VFC<Props> = ({ albums, albumCount = 4, selectedIndex, setSelectedIndex }) => {
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const today = new Date();
  const flickForward = useCallback(() => {
    setSelectedIndex(selectedIndex < albums.length - 1 ? selectedIndex + 1 : 0);
    setDirection(1);
  }, [albums.length, selectedIndex, setSelectedIndex]);

  useEffect(() => {
    const flick = () => {
      if (!isPaused) {
        flickForward();
      }
    };
    const interval = setInterval(flick, autoFlickDelay);
    return () => clearInterval(interval);
  }, [albums, flickForward, isPaused]);

  const wrap = useMemo(() => {
    const wrap = albums.slice(selectedIndex, selectedIndex + albumCount);
    if (wrap.length < albumCount) {
      new Array(albumCount - wrap.length).fill(0).forEach((_, i) => {
        wrap.push(albums[i]);
      });
    }
    return wrap.filter(Boolean).reverse();
  }, [albumCount, albums, selectedIndex]);

  return (
    <Box h="0" pb="150%" position="relative" sx={{ perspective: '10000px' }}>
      <AnimatePresence>
        {wrap.map(({ uid, data: { cover, title, bgcolor, enddate } }, i) => {
          const isCurrent = i + 1 === albumCount;
          const hasEnded = !!enddate && !isAfter(new Date(enddate), today);

          return (
            <Album
              position="absolute"
              key={uid}
              w="70%"
              h="0"
              pb="70%"
              custom={{ direction, index: i, albumCount }}
              variants={variants}
              initial="enter"
              animate="visible"
              whileTap={isCurrent ? 'hold' : 'tap'}
              onTapStart={isCurrent ? () => setIsPaused(true) : undefined}
              onTap={isCurrent ? () => setIsPaused(false) : flickForward}
              onTapCancel={isCurrent ? () => setIsPaused(false) : flickForward}
              exit="exit"
              mixBlendMode={isCurrent ? 'normal' : 'multiply'}
              bgImage={`linear-gradient(-45deg, rgba(0,0,0,0), rgba(0,0,0,0.25)), linear-gradient(0deg, ${bgcolor}, ${bgcolor})`}
              userSelect="none"
              borderRadius="5%"
            >
              <Box
                pointerEvents="none"
                opacity={Math.pow((i + 1) / albumCount, 3)}
                transition="all .6s ease-out"
                _hover={{ opacity: 1 }}
                overflow="hidden"
                borderRadius="5%"
                zIndex="2"
                position="absolute"
                w="100%"
                h="100%"
              >
                {isCurrent && !isPaused && <AutoFlickBar />}
                {cover && (
                  <Image
                    src={cover?.url}
                    width={cover?.dimensions.width}
                    height={cover?.dimensions.height}
                    alt={'Capa do filme' + (title ? ` ${RichText.asText(title)}` : '') + ' por Paulo Marcelo Oz'}
                    sizes="256px"
                  />
                )}
              </Box>

              {isCurrent && !hasEnded && (
                <MotionBox
                  pointerEvents="none"
                  initial={{ transform: 'none' }}
                  animate={{ transform: 'translateX(33%)', transition: { delay: 0.3 } }}
                  position="absolute"
                  top="0"
                  w="100%"
                  h="100%"
                  borderRadius="full"
                  zIndex="1"
                >
                  <Image src={vinyl} placeholder="blur" alt="" layout="responsive" bg="transparent" />
                </MotionBox>
              )}
            </Album>
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default AlbumFlicker;
