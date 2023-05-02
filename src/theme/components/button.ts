import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  fontWeight: 'medium',
});

const sizes = {
  lg: defineStyle({
    px: '20px',
    py: '12px',
    fontSize: '18px',
  }),
  md: defineStyle({
    px: '16px',
    py: '8px',
    fontSize: '16px',
  }),
  sm: defineStyle({
    px: '12px',
    py: '4px',
    fonSize: '14px',
  }),
};

const solid = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bgColor: `${c}.400`,
    _hover: { bgColor: `${c}.500` },
    _active: { bgColor: `${c}.600` },
    _dark: {
      color: 'gray.100',
      bgColor: `${c}.600`,
      _hover: { bgColor: `${c}.700` },
      _active: { bgColor: `${c}.800` },
    },
  };
});

const ghost = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    color: 'gray.700',
    _hover: { color: `${c}.400`, bgColor: `${c}.50` },
    _active: { bgColor: `${c}.100` },
    _dark: {
      color: 'gray.100',
      _hover: { color: `${c}.400`, bgColor: 'whiteAlpha.50' },
      _active: { bgColor: 'whiteAlpha.100' },
    },
  };
});

const outline = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    _hover: { color: `${c}.400`, bgColor: `${c}.50` },
    _active: { bgColor: `${c}.100` },
    _dark: {
      _hover: { bgColor: 'whiteAlpha.50' },
      _active: { bgColor: 'whiteAlpha.100' },
    },
  };
});

const Button = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    solid,
    ghost,
    outline,
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'blue',
  },
});

export { Button };
