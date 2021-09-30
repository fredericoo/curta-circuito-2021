import { Container, Box, HStack } from '@chakra-ui/react';
import FilmText from '../FilmText';
import Image from '@/components/Image';
import { Config, Sponsor } from '@/lib/types';
import { groupBy } from 'ramda';

type Props = Config;

const groupSponsorsByType = groupBy<Sponsor>(({ sponsor_type }) => sponsor_type || 'etc');

const Footer: React.VFC<Props> = ({ staff, sponsor }) => {
  const sponsorsByType = sponsor ? groupSponsorsByType(sponsor) : {};
  const sponsorGroups = Object.entries(sponsorsByType);
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
        <HStack justify="center" wrap="wrap" pt={8} align="flex-start" fontSize="md">
          {sponsorGroups.map(([type, sponsors], j) => (
            <Box key={type} px={8} py={4}>
              <FilmText label={type} />
              <HStack pt={2} wrap="wrap" justify="center">
                {sponsors.map(
                  ({ sponsor_logo: logo }, i) =>
                    logo?.url && (
                      <Box
                        key={i}
                        w={
                          j + 1 === sponsorGroups.length && i + 1 === sponsors.length
                            ? '228px'
                            : j === 0
                            ? '160px'
                            : '96px'
                        }
                        p={4}
                      >
                        <Image
                          bg="transparent"
                          src={logo.url}
                          width={logo.dimensions.width}
                          height={logo.dimensions.height}
                          alt={logo.alt}
                          layout="intrinsic"
                        />
                      </Box>
                    )
                )}
              </HStack>
            </Box>
          ))}
        </HStack>
      </Box>
    </Container>
  );
};

export default Footer;
