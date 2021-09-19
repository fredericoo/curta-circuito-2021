import { Box } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Film } from '@/lib/types';

const Album = motion(Box);

const variants = {
  enter: ({ direction, index }: { direction: number; index: number }) => ({
    transform: `rotateX(30deg) rotateY(${
      -60 + (4 - index) * 20 + 30 * direction
    }deg) rotateZ(0) translateX(${
      30 * Math.sin(index) - 30 * direction
    }%) translateY(${15 * (4 - index)}%)`,
    opacity: 0,
  }),
  visible: ({ index }: { direction: number; index: number }) => ({
    transform: `rotateX(30deg) rotateY(${
      -60 + (4 - index) * 20
    }deg) rotateZ(0) translateX(${30 * Math.sin(index)}%) translateY(${
      15 * (4 - index)
    }%)`,
    opacity: 1,
  }),
  tap: ({ index }: { direction: number; index: number }) => ({
    transform: `rotateX(30deg) rotateY(${
      -60 + (4 - index) * 20
    }deg) rotateZ(0) translateX(${30 * Math.sin(index)}%) translateY(${
      15 * (4 - index) - (index ? 10 : 0)
    }%)`,
    opacity: 1,
  }),
  exit: ({ direction, index }: { direction: number; index: number }) => ({
    transform: `rotateX(30deg) rotateY(${
      -60 + (4 - index) * 20 - 30 * direction
    }deg) rotateZ(0) translateX(${
      30 * Math.sin(index) + 30 * direction
    }%) translateY(${15 * (4 - index)}%)`,
    opacity: 0,
  }),
};

type Props = {
  albums: Film[];
  albumCount: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const AlbumFlicker: React.VFC<Props> = ({
  albums,
  albumCount = 4,
  selectedIndex,
  setSelectedIndex,
}) => {
  const [direction, setDirection] = useState(1);

  const flickForward = () => {
    setSelectedIndex(selectedIndex < albums.length - 1 ? selectedIndex + 1 : 0);
    setDirection(1);
  };

  // const flickBackward = () => {
  //   page > 0 ? setPage([page - 1, -1]) : setPage([albumCovers.length - 1, -1]);
  // };

  // const flickTo = (index: number) => {
  //   setSelectedIndex(index);
  //   setDirection(-1);
  // };

  const wrap = useMemo(() => {
    const wrap = albums.slice(selectedIndex, selectedIndex + albumCount);
    if (wrap.length < albumCount) {
      new Array(albumCount - wrap.length).fill(0).forEach((_, i) => {
        wrap.push(albums[i]);
      });
    }
    return wrap;
  }, [albumCount, albums, selectedIndex]);

  return (
    <Box h="0" pb="130%" position="relative">
      <AnimatePresence>
        {wrap.map(({ cover, title, bgColor }, i) => (
          <Album
            position="absolute"
            key={title}
            w="70%"
            h="0"
            pb="70%"
            borderRadius="xl"
            transformOrigin="left center"
            custom={{ direction, index: i }}
            variants={variants}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            initial="enter"
            animate="visible"
            whileTap="tap"
            exit="exit"
            mixBlendMode={!i ? 'normal' : 'multiply'}
            bgImage={`linear-gradient(-45deg, rgba(0,0,0,0), rgba(0,0,0,0.25)), linear-gradient(0deg, var(--cc2021-colors-${bgColor}), var(--cc2021-colors-${bgColor}))`}
            onClick={flickForward}
            overflow="hidden"
            zIndex={albumCount - i}
          >
            <Box
              opacity={i === 0 ? 1 : 0}
              transition="all .6s ease-out"
              _hover={{ opacity: 1 }}
            >
              {cover && (
                <Image
                  src={cover?.url}
                  width={cover?.dimensions.width}
                  height={cover?.dimensions.height}
                  alt={title}
                />
              )}
            </Box>
          </Album>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default AlbumFlicker;
