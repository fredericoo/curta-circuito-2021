export const Button = {
  baseStyle: {
    borderRadius: 'xl',
    fontWeight: 400,
  },
  variants: {
    primary: {
      bg: 'pink.400',
      color: 'gray.100',
      _hover: { boxShadow: 'discoSmall', transform: 'translateY(-.6rem)' },
      _active: { transform: 'none', boxShadow: 'none' },
      _disabled: { pointerEvents: 'none' },
    },
    secondary: {
      color: 'gray.900',
      border: '1px solid',
      borderColor: 'pink.600',
      _hover: { boxShadow: 'discoSmall', transform: 'translateY(-.6rem)' },
      _active: { transform: 'none', boxShadow: 'none' },
      _disabled: { pointerEvents: 'none' },
    },
  },
  sizes: {
    sm: {
      padding: '.375rem .625rem',
      height: 'auto',
    },
    md: {
      fontSize: '1.2rem',
      px: 7,
      py: 3,
      height: 'auto',
    },
  },
};
