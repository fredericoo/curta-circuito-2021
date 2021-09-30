import useSeconds from '@/lib/useSeconds';
import { isAfter } from 'date-fns';
import { Box, Button, HStack } from '@chakra-ui/react';
import FilmText from '@/components/FilmText';
import TimeCounter from '@/components/TimeCounter';

type FilmAvailabilityProps = {
  startdate?: string;
  enddate?: string;
};

const FilmAvailability: React.VFC<FilmAvailabilityProps> = ({ startdate, enddate }) => {
  const now = useSeconds();
  const today = new Date();
  const hasStarted = !startdate || !isAfter(new Date(startdate), today);
  const hasEnded = !!enddate && !isAfter(new Date(enddate), today);

  if (!hasStarted && startdate)
    return (
      <HStack wrap="wrap" spacing={4}>
        <Button isDisabled={!hasStarted || hasEnded} variant="primary">
          Assistir
        </Button>

        <Box whiteSpace="nowrap">
          <FilmText label="Disponível em" />
          <TimeCounter from={now} to={new Date(startdate)} />
        </Box>
      </HStack>
    );

  if (hasStarted && !hasEnded && enddate)
    return (
      <HStack wrap="wrap" spacing={4}>
        <Button isDisabled={!hasStarted || hasEnded} variant="primary">
          Assistir
        </Button>
        <Box whiteSpace="nowrap">
          <FilmText label="Disponível por" />
          <TimeCounter from={new Date(enddate)} to={now} />
        </Box>
      </HStack>
    );

  return null;
};

export default FilmAvailability;
