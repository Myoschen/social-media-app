import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    fontSize: '16px',
    fontWeight: '500',
    rounded: 'md',
  },
  sizes: {
    lg: {
      px: '20px',
      py: '12px',
      fontSize: '18px',
    },
    md: {
      px: '14px',
      py: '8px',
      fontSize: '16px',
    },
    sm: {
      px: '8px',
      py: '4px',
      fonSize: '14px',
    },
  },
  variants: {
    solid: {
      color: 'white',
      bgColor: 'blue.400',
      _hover: { bgColor: 'blue.500' },
      _active: { bgColor: 'blue.600' },
      _dark: {
        bgColor: 'blue.700',
        _hover: { bgColor: 'blue.800' },
        _active: { bgColor: 'blue.900' },
      },
    },
    ghost: {
      _hover: { bgColor: 'blue.50' },
      _active: { bgColor: 'blue.100' },
      _dark: {
        _hover: { bgColor: 'whiteAlpha.50' },
        _active: { bgColor: 'whiteAlpha.100' },
      },
    },
  },
  defaultProps: {
    variant: 'solid',
    size: 'md',
  },
});

export { Button };
