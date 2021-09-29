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
import { resolveDocumentURL } from '@/lib/queries';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import format from '@/lib/dateTime';

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
  as: 'dl',
};

const FilmsFlicker: React.VFC<Props> = ({ films }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const now = useSeconds();
  const today = new Date();

  const film = films[selectedIndex];
  if (!film) return null;
  const data = film.data;

  const hasStarted = !data.startdate || !isAfter(new Date(data.startdate), today);
  const hasEnded = !!data.enddate && !isAfter(new Date(data.enddate), today);

  return (
    <SimpleGrid columns={{ lg: 2 }} gap={{ base: 0, lg: 8 }} alignItems="center" mt={{ base: -16, lg: 0 }}>
      <AlbumFlicker albums={films} albumCount={5} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      <Box fontSize="md" mt={{ base: -4, md: 0 }} userSelect="none">
        <Box overflow="hidden" position="relative">
          <AnimatePresence>
            <PrompterText mb={2} key={`${film.uid}-date`}>
              {data.startdate && (
                <>
                  <FilmText label={format(new Date(data.startdate), 'eeee')}>
                    {format(new Date(data.startdate), "d 'de' LLLL")}
                  </FilmText>{' '}
                  <FilmText label={format(new Date(data.startdate), 'p')} />
                </>
              )}
            </PrompterText>
          </AnimatePresence>
        </Box>

        {data.title && <DiscoHeading key={`${film.uid}-title`}>{RichText.asText(data.title)}</DiscoHeading>}

        <Box overflow="hidden" position="relative">
          <AnimatePresence>
            <PrompterText mb={4} key={`${film.uid}-details`}>
              {data.director && <FilmText label="Direção">{data.director}</FilmText>}{' '}
              {data.year && <FilmText label="Ano">{data.year}</FilmText>}{' '}
              {data.duration && <FilmText label="Dur.">{data.duration}’</FilmText>}{' '}
            </PrompterText>
          </AnimatePresence>
        </Box>
        <HStack spacing={8}>
          {film && (
            <Link href={resolveDocumentURL(film)} passHref>
              <Button as="a" variant="secondary" rightIcon={<PlusIcon />}>
                Ver mais
              </Button>
            </Link>
          )}
          <Button isDisabled={!hasStarted || hasEnded} variant="primary">
            Assistir
          </Button>
          {!hasStarted && data.startdate && (
            <Box whiteSpace="nowrap">
              <FilmText label="Disponível em" />
              <TimeCounter from={now} to={new Date(data.startdate)} />
            </Box>
          )}
          {hasStarted && !hasEnded && data.enddate && (
            <Box whiteSpace="nowrap">
              <FilmText label="Disponível por" />
              <TimeCounter from={new Date(data.enddate)} to={now} />
            </Box>
          )}
        </HStack>
      </Box>
    </SimpleGrid>
  );
};

const PlusIcon: React.VFC = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.50033 15.5837C12.4123 15.5837 15.5837 12.4123 15.5837 8.50033C15.5837 4.58831 12.4123 1.41699 8.50033 1.41699C4.58831 1.41699 1.41699 4.58831 1.41699 8.50033C1.41699 12.4123 4.58831 15.5837 8.50033 15.5837Z"
      strokeLinecap="round"
    />
    <path d="M8.5 5.66699V11.3337" strokeLinecap="round" />
    <path d="M5.66699 8.5H11.3337" strokeLinecap="round" />
  </svg>
);

export default FilmsFlicker;
