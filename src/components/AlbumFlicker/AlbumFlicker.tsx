import { Box, HStack } from '@chakra-ui/layout';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Film } from '@/lib/types';
import Image from '@/components/Image';
import Album from '@/components/Album';
import { RichText } from 'prismic-reactjs';
import vinyl from '../../../public/img/vinyl.png';
import { isAfter } from 'date-fns';
import { Button } from '@chakra-ui/react';

type VariantCallback = (args: {
  direction: number;
  index: number;
  albumCount: number;
}) => Record<string, string | number>;

const variants: Record<string, VariantCallback> = {
  enter: ({ index, albumCount, direction }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 0 - index + direction) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount + 1 - index + direction)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 0 - index + direction)}%) translateZ(30px) scale(1)`,
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
  exit: ({ index, albumCount, direction }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 2 - index + direction) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - 1 - index + direction)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 2 - index + direction)}%) translateZ(30px) scale(1)`,
    opacity: 0,
  }),
};

type Props = {
  albums: Film[];
  albumCount: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const MotionBox = motion(Box);

const AlbumFlicker: React.VFC<Props> = ({ albums, albumCount = 4, selectedIndex, setSelectedIndex }) => {
  const [lastIndex, setLastIndex] = useState(selectedIndex);
  const today = new Date();

  const flickForward = useCallback(() => {
    setLastIndex(selectedIndex);
    setSelectedIndex(selectedIndex < albums.length - 1 ? selectedIndex + 1 : 0);
  }, [albums.length, selectedIndex, setSelectedIndex]);

  const flickBackward = useCallback(() => {
    setLastIndex(selectedIndex);
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : albums.length - 1);
  }, [albums.length, selectedIndex, setSelectedIndex]);

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
              custom={{ direction: lastIndex > i ? 1 : -1, index: i, albumCount }}
              variants={variants}
              initial="enter"
              animate="visible"
              whileTap={isCurrent ? 'hold' : 'tap'}
              onTap={flickForward}
              onTapCancel={flickForward}
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
      <HStack position="absolute" bottom="1rem" w="100%" justify="flex-end">
        <Button bg="gray.200" onClick={flickBackward}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.5L2 8.5M2 8.5L8.5 2M2 8.5L8.5 15" stroke="black" strokeLinecap="round" />
          </svg>
        </Button>
        <Button bg="gray.200" onClick={flickForward}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 7.5L6.5 0.999999M5.68248e-07 7.5L13 7.5L5.68248e-07 7.5ZM13 7.5L6.5 14L13 7.5Z"
              stroke="black"
            />
          </svg>
        </Button>
      </HStack>
    </Box>
  );
};

export default AlbumFlicker;
