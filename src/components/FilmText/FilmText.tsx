import { Text } from '@chakra-ui/layout';
import { styled } from '@chakra-ui/system';

const FilmText = styled(Text, {
  baseStyle: {
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '.70em',
    letterSpacing: 'tight',
  },
});

FilmText.defaultProps = {
  as: 'span',
};

export default FilmText;
