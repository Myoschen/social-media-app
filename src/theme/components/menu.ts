import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    minW: 'fit-content',
    rounded: 'md',
    borderColor: 'gray.100',
    _dark: {
      bgColor: '#222',
      borderColor: 'gray.800',
    },
  },
  item: {
    fontSize: 'sm',
    _hover: {
      color: 'blue.400',
      bgColor: 'blue.50',
    },
    _dark: {
      bgColor: '#222',
      _hover: {
        bgColor: 'whiteAlpha.50',
      },
    },
  },
});

// export the base styles in the component theme
export const Menu = defineMultiStyleConfig({ baseStyle });
