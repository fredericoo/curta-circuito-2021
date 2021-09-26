import { Text } from '@chakra-ui/layout';
import { styled } from '@chakra-ui/system';

const Label = styled(Text, {
  baseStyle: {
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '.70em',
    letterSpacing: 'tight',
    display: 'inline',
  },
});

type Props = {
  label: string;
};
const FilmText: React.FC<Props> = ({ label, children }) => (
  <>
    <Label as="dt">{label}</Label>{' '}
    <Text as="dd" display="inline">
      {children}
    </Text>
  </>
);

export default FilmText;
