import useSeconds from '@/lib/useSeconds';
import { isAfter } from 'date-fns';
import { Box } from '@chakra-ui/react';
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
      <Box whiteSpace="nowrap">
        <FilmText label="Disponível em" />
        <TimeCounter from={now} to={new Date(startdate)} />
      </Box>
    );

  if (hasStarted && !hasEnded && enddate)
    return (
      <Box whiteSpace="nowrap">
        <FilmText label="Disponível por" />
        <TimeCounter from={new Date(enddate)} to={now} />
      </Box>
    );

  return null;
};

export default FilmAvailability;
