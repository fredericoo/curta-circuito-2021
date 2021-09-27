import { Box } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Film } from '@/lib/types';
import Album from '@/components/Album';
import { RichText } from 'prismic-reactjs';

type VariantCallback = (args: {
  direction: number;
  index: number;
  albumCount: number;
}) => Record<string, string | number>;

const variants: Record<string, VariantCallback> = {
  enter: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 0 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount + 1 - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 0 - index)}%) translateZ(30px)`,
    opacity: 0,
  }),
  visible: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 1 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 1 - index)}%) translateZ(30px)`,
    opacity: 1,
  }),
  tap: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 1 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 1 - index) - 20}%) translateZ(30px)`,
    opacity: 1,
  }),
  exit: ({ index, albumCount }) => ({
    transform: `rotateX(-30deg) rotateY(${-20 + (albumCount - 2 - index) * 20}deg) rotateZ(0) translateX(${
      20 - 30 * Math.cos(albumCount - 1 - index)
    }%) translateY(${albumCount * 20 - 15 * (albumCount - 2 - index)}%) translateZ(30px)`,
    opacity: 0,
  }),
};

type Props = {
  albums: Film[];
  albumCount: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const AlbumFlicker: React.VFC<Props> = ({ albums, albumCount = 4, selectedIndex, setSelectedIndex }) => {
  const [direction, setDirection] = useState(1);

  const flickForward = () => {
    setSelectedIndex(selectedIndex < albums.length - 1 ? selectedIndex + 1 : 0);
    setDirection(1);
  };

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
        {wrap.map(({ uid, data: { cover, title, bgcolor } }, i) => (
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
            whileTap="tap"
            exit="exit"
            mixBlendMode={i + 1 === albumCount ? 'normal' : 'multiply'}
            bgImage={`linear-gradient(-45deg, rgba(0,0,0,0), rgba(0,0,0,0.25)), linear-gradient(0deg, ${bgcolor}, ${bgcolor})`}
            onClick={flickForward}
            backfaceVisibility="hidden"
            userSelect="none"
          >
            <Box
              pointerEvents="none"
              opacity={i + 1 === albumCount ? 1 : 0}
              transition="all .6s ease-out"
              _hover={{ opacity: 1 }}
            >
              {cover && (
                <Image
                  src={cover?.url}
                  width={cover?.dimensions.width}
                  height={cover?.dimensions.height}
                  alt={'Capa do filme' + (title ? ` ${RichText.asText(title)}` : '')}
                  sizes="256px"
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
