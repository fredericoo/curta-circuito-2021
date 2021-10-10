import useSeconds from '@/lib/useSeconds';
import { isAfter } from 'date-fns';
import { Box, Button, VStack } from '@chakra-ui/react';
import FilmText from '@/components/FilmText';
import TimeCounter from '@/components/TimeCounter';
import Link from 'next/link';

type FilmAvailabilityProps = {
  startdate?: string;
  enddate?: string;
  watchUrl?: string;
};

const FilmAvailability: React.VFC<FilmAvailabilityProps> = ({ startdate, enddate, watchUrl }) => {
  const now = useSeconds();
  if (!watchUrl) return null;
  const today = new Date();
  const hasStarted = !startdate || !isAfter(new Date(startdate), today);
  const hasEnded = !!enddate && !isAfter(new Date(enddate), today);

  return (
    <VStack flexGrow={1} align="flex-start">
      <Link href={watchUrl} passHref>
        <Button
          as="a"
          isDisabled={process.env.NODE_ENV === 'production' && (hasEnded || !hasStarted)}
          variant="primary"
          w="100%"
        >
          Assistir
        </Button>
      </Link>

      <Box whiteSpace="nowrap">
        {hasStarted && !hasEnded && enddate ? (
          <>
            <FilmText label="Disponível por" />
            <TimeCounter from={new Date(enddate)} to={now} />
          </>
        ) : !hasStarted && startdate ? (
          <>
            <FilmText label="Disponível em" />
            <TimeCounter from={now} to={new Date(startdate)} />
          </>
        ) : null}
      </Box>
    </VStack>
  );
};

export default FilmAvailability;
