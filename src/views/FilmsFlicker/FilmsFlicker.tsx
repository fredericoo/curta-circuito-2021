import AlbumFlicker from '@/components/AlbumFlicker';
import DiscoHeading from '@/components/DiscoHeading';
import type { Film } from '@/lib/types';
import { Box, Button, SimpleGrid, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import FilmText from '@/components/FilmText';
import { isAfter } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import TimeCounter from '@/components/TimeCounter';
import useSeconds from '@/lib/useSeconds';
import { getFilmUrl } from '@/lib/queries';
import Link from 'next/link';

type Props = {
  films: Film[];
};

const prompterVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(100%)',

    position: 'absolute',
  },
  animate: {
    opacity: 1,
    transform: 'translateY(0%)',
    position: 'relative',
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transform: 'translateY(-100%)',
    position: 'absolute',
    transition: { duration: 0.3 },
  },
};
const PrompterText = motion(Text);
PrompterText.defaultProps = {
  variants: prompterVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  display: 'inline-block',
};

const FilmsFlicker: React.VFC<Props> = ({ films }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const film = films[selectedIndex];
  const today = new Date();
  const now = useSeconds();
  const hasStarted =
    !film.startDate || !isAfter(new Date(film.startDate), today);
  const hasEnded = !!film.endDate && !isAfter(new Date(film.endDate), today);

  return (
    <SimpleGrid columns={[1, 2]} gap={8} alignItems="center">
      <AlbumFlicker
        albums={films}
        albumCount={4}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Box fontSize="md">
        <Box overflow="hidden" position="relative">
          <AnimatePresence>
            <PrompterText mb={2} key={`${film.title}-date`}>
              <FilmText>Segunda-feira</FilmText> 11 de Outubro{' '}
              <FilmText>18h</FilmText>
            </PrompterText>
          </AnimatePresence>
        </Box>

        <DiscoHeading key={`${film.title}-title`}>{film.title}</DiscoHeading>
        <Box overflow="hidden" position="relative">
          <AnimatePresence>
            <PrompterText mb={4} key={`${film.title}-deets`}>
              <FilmText>Direção</FilmText> Lael Rodrigues{' '}
              <FilmText>Ano</FilmText> 1984 <FilmText>Dur.</FilmText> 72’
            </PrompterText>
          </AnimatePresence>
        </Box>
        <HStack spacing={8}>
          {film.slug && (
            <Link href={getFilmUrl(film.slug)} passHref>
              <Button as="a" variant="secondary" rightIcon={<PlusIcon />}>
                Ver mais
              </Button>
            </Link>
          )}
          <Button isDisabled={!hasStarted || hasEnded} variant="primary">
            Assistir
          </Button>
          {!hasStarted && film.startDate && (
            <Box whiteSpace="nowrap">
              <FilmText>Disponível em</FilmText>
              <TimeCounter from={now} to={new Date(film.startDate)} />
            </Box>
          )}
          {hasStarted && !hasEnded && film.endDate && (
            <Box whiteSpace="nowrap">
              <FilmText>Disponível por</FilmText>
              <TimeCounter from={new Date(film.endDate)} to={now} />
            </Box>
          )}
        </HStack>
      </Box>
    </SimpleGrid>
  );
};

const PlusIcon: React.VFC = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.50033 15.5837C12.4123 15.5837 15.5837 12.4123 15.5837 8.50033C15.5837 4.58831 12.4123 1.41699 8.50033 1.41699C4.58831 1.41699 1.41699 4.58831 1.41699 8.50033C1.41699 12.4123 4.58831 15.5837 8.50033 15.5837Z"
      strokeLinecap="round"
    />
    <path d="M8.5 5.66699V11.3337" strokeLinecap="round" />
    <path d="M5.66699 8.5H11.3337" strokeLinecap="round" />
  </svg>
);

export default FilmsFlicker;
