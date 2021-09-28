import { Container, Box, HStack } from '@chakra-ui/react';
import FilmText from '../FilmText';
import Image from '@/components/Image';
import { Config, Sponsor } from '@/lib/types';
import { groupBy } from 'ramda';

type Props = Config;

const groupSponsorsByType = groupBy<Sponsor>(({ sponsor_type }) => sponsor_type || 'etc');

const Footer: React.VFC<Props> = ({ staff, sponsor }) => {
  const sponsorsByType = sponsor ? groupSponsorsByType(sponsor) : {};

  return (
    <Container maxW="container.xl" pt={8} color="gray.100">
      <Box bg="purple.800" p={8} pb={{ base: 32, md: 8 }} borderTopRadius="1.5rem" textAlign="center">
        <Box>
          {staff?.map(({ role, name }) => (
            <FilmText key={`${role}-${name}`} label={role || ''}>
              {name}
            </FilmText>
          ))}
        </Box>
        <HStack justify="center" spacing={8} wrap="wrap" pt={8}>
          {Object.entries(sponsorsByType).map(([type, sponsors]) => (
            <Box key={type}>
              {type}
              {sponsors.map(
                ({ sponsor_logo: logo }, i) =>
                  logo?.url && (
                    <Box key={i} w="100px" pb={8}>
                      <Image
                        src={logo.url}
                        width={logo.dimensions.width}
                        height={logo.dimensions.height}
                        alt={logo.alt}
                        layout="intrinsic"
                      />
                    </Box>
                  )
              )}
            </Box>
          ))}
        </HStack>
      </Box>
    </Container>
  );
};

export default Footer;
