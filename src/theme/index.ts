import { extendTheme, theme as base, ThemeOverride, ToastProviderProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Button, Menu } from './components';

// customize theme
const overrides = {
  styles: {
    global: (props) => ({
      body: {
        color: mode('gray.700', 'gray.100')(props),
        bgColor: mode('white', 'gray.900')(props),
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Work SansVariable', ${base.fonts.heading}`,
    body: `'Work SansVariable', ${base.fonts.body}`,
    mono: `'JetBrains MonoVariable', ${base.fonts.mono}`,
  },
  colors: {
    gray: {
      '50': '#F2F3F3',
      '100': '#DADCDD',
      '200': '#C2C6C7',
      '300': '#AAAFB1',
      '400': '#92999B',
      '500': '#7A8285',
      '600': '#61686B',
      '700': '#494E50',
      '800': '#313435',
      '900': '#181A1B',
    },
    red: {
      '50': '#FAEAEA',
      '100': '#F2C5C5',
      '200': '#E9A0A0',
      '300': '#E07A7A',
      '400': '#D85555',
      '500': '#CF3030',
      '600': '#A62626',
      '700': '#7C1D1D',
      '800': '#531313',
      '900': '#290A0A',
    },
    orange: {
      '50': '#FAF1EB',
      '100': '#F0D7C6',
      '200': '#E7BDA2',
      '300': '#DDA37E',
      '400': '#D48959',
      '500': '#CA6F35',
      '600': '#A2592A',
      '700': '#794320',
      '800': '#512D15',
      '900': '#28160B',
    },
    green: {
      '50': '#EEF7F2',
      '100': '#CFE7DB',
      '200': '#B0D8C3',
      '300': '#92C9AC',
      '400': '#73BA94',
      '500': '#54AB7D',
      '600': '#438964',
      '700': '#33664B',
      '800': '#224432',
      '900': '#112219',
    },
    yellow: {
      '50': '#F9F5EB',
      '100': '#EFE2C8',
      '200': '#E4CFA5',
      '300': '#D9BC81',
      '400': '#CFAA5E',
      '500': '#C4973B',
      '600': '#9D792F',
      '700': '#765B23',
      '800': '#4F3C17',
      '900': '#271E0C',
    },
    teal: {
      '50': '#EEF6F6',
      '100': '#D0E6E6',
      '200': '#B3D6D6',
      '300': '#95C6C5',
      '400': '#77B6B5',
      '500': '#59A6A5',
      '600': '#478584',
      '700': '#356463',
      '800': '#244242',
      '900': '#122121',
    },
    cyan: {
      '50': '#EBF7FA',
      '100': '#C6E9F0',
      '200': '#A2DBE7',
      '300': '#7ECEDD',
      '400': '#59C0D4',
      '500': '#35B2CA',
      '600': '#2A8EA2',
      '700': '#206B79',
      '800': '#154751',
      '900': '#0B2428',
    },
    blue: {
      '50': '#ECF2F8',
      '100': '#CBDCEB',
      '200': '#AAC5DF',
      '300': '#88AFD2',
      '400': '#6798C6',
      '500': '#4682B9',
      '600': '#386894',
      '700': '#2A4E6F',
      '800': '#1C344A',
      '900': '#0E1A25',
    },
    purple: {
      '50': '#F0EDF8',
      '100': '#D5CBEB',
      '200': '#BAAADE',
      '300': '#A089D2',
      '400': '#8568C5',
      '500': '#6A47B8',
      '600': '#553993',
      '700': '#402B6E',
      '800': '#2A1C4A',
      '900': '#150E25',
    },
    pink: {
      '50': '#F8EDF2',
      '100': '#EBCCDC',
      '200': '#DEABC5',
      '300': '#D08AAE',
      '400': '#C36998',
      '500': '#B64981',
      '600': '#923A67',
      '700': '#6D2C4D',
      '800': '#491D34',
      '900': '#240F1A',
    },
  },
  components: { Button, Menu },
} satisfies ThemeOverride;

const theme = extendTheme(overrides);

// configure toast default options
const toastOptions = {
  defaultOptions: {
    isClosable: true,
    position: 'bottom-right',
    duration: 2500,
  },
  motionVariants: {
    initial: { opacity: 0.25, x: -25 },
    animate: {
      x: -5,
      opacity: 1,
      transition: { type: 'spring', stiffness: 160, duration: 0.5 },
    },
    exit: { opacity: 0 },
  },
} satisfies ToastProviderProps;

export { theme, toastOptions };
