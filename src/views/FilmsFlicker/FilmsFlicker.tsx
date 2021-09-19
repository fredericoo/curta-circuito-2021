import AlbumFlicker from '@/components/AlbumFlicker';
import DiscoHeading from '@/components/DiscoHeading';
import type { Film } from '@/lib/types';
import { Box, Button, SimpleGrid, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import FilmText from '@/components/FilmText';
import { isAfter } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  films: Film[];
};

const prompterVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(100%)',
    duration: 0.5,
    position: 'absolute',
  },
  animate: { opacity: 1, transform: 'translateY(0%)', position: 'relative' },
  exit: {
    opacity: 0,
    transform: 'translateY(-100%)',
    position: 'absolute',
    duration: 0.2,
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
  const isDisabled =
    !film.startDate ||
    isAfter(new Date(film.startDate), today) ||
    (!!film.endDate && !isAfter(new Date(film.endDate), today));

  return (
    <SimpleGrid columns={[1, 2]} gap={8} alignItems="center">
      <AlbumFlicker
        albums={films}
        albumCount={4}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Box fontSize="md">
        <AnimatePresence>
          <PrompterText mb={2} key={`${film.title}-date`}>
            <FilmText>Segunda-feira</FilmText> 11 de Outubro{' '}
            <FilmText>18h</FilmText>
          </PrompterText>
        </AnimatePresence>

        <DiscoHeading key={`${film.title}-title`}>{film.title}</DiscoHeading>
        <AnimatePresence>
          <PrompterText mb={4} key={`${film.title}-deets`}>
            <FilmText>Direção</FilmText> Lael Rodrigues <FilmText>Ano</FilmText>{' '}
            1984 <FilmText>Dur.</FilmText> 72’
          </PrompterText>
        </AnimatePresence>
        <HStack spacing={8}>
          <Button variant="secondary" rightIcon={<PlusIcon />}>
            Ver mais
          </Button>
          <Button isDisabled={isDisabled} variant="primary">
            Assistir
          </Button>
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
