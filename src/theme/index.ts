import { components } from './components';
import { textStyles } from './typography';

export * from './colors';

export const MAX_PAGE_WIDTH = '1296px';

const breakpoints = {
  xm: '500px',
  sm: '720px',
  md: '834px',
  xmd: '1100px',
  lg: '1340px',
  xl: '1400px',
  '2xl': '1536px',
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = {
  styles: {
    global: {
      '#jupiter-terminal > div': {
        // Wallet Modal needs to be larger (1040)
        zIndex: 1039,
        "> div[class*='absolute']": {
          backgroundColor: 'rgba(0,0,0,0.75)',
        },
      },
      ':focus-visible': {
        outline: 'none',
      },
      // Wallet modal needs to be larger than drawer
      '.wallet-adapter-modal': {
        zIndex: 1600,
      },
    },
  },
  fonts: {
    heading: 'NeueHaas, Rajdhani, Roboto, sans-serif',
    body: 'NeueHaas, Rajdhani, Roboto, sans-serif',
  },
  config,
  breakpoints,
  components,
  textStyles,
  customScroll: {
    '&::-webkit-scrollbar': {
      height: '3px',
      width: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'lightGray',
      borderRadius: '14px',
    },
  },
  hiddenScroll: {
    '&::-webkit-scrollbar': {
      height: '0px',
      width: '0px',
    },
  },
};
