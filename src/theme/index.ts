import { components } from './components';
import { textStyles } from './typography';

export * from './colors';

const breakpoints: { [key: string]: string } = {
  xm: '500px',
  sm: '720px',
  md: '900px',
  md2: '1025px',
  lg: '1340px',
  xl: '1420px',
  '2xl': '1425px',
  '3xl': '1750px',
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = {
  styles: {
    global: {
      '#jupiter-terminal > div': {
        zIndex: 100,
        "> div[class*='absolute']": {
          backgroundColor: 'rgba(0,0,0,0.75)',
        },
      },
    },
  },
  fonts: {
    heading: 'NeueHaas, Rajdhani, Roboto, sans-serif',
    body: 'NeueHaas, Rajdhani, Roboto, sans-serif',
  },
  config,
  breakpoints,
  components: components,
  textStyles,
  modalStyle: {
    content: {
      border: 'none',
      boxShadow: '2px 2px 12px rgba(78, 75, 102, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      margin: 'auto 0',
      overflow: 'hidden',
      position: 'relative',
    },
    overlay: {
      alignItems: 'unset',
      background: 'rgba(16, 32, 72, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '20px',
      zIndex: 12345,
    },
  },
  bottomSheetStyle: {
    content: {
      border: 'none',
      boxShadow: '2px 2px 12px rgba(78, 75, 102, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content',
      bottom: '0',
      margin: 'auto 0',
      position: 'absolute',
      maxWidth: '375px',
      minHeight: '400px',
      justifyContent: 'space-between',
    },
    overlay: {
      alignItems: 'unset',
      background: 'rgba(16, 32, 72, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      zIndex: 12345,
    },
  },
  customScroll: {
    '&::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'lightGray',
      borderRadius: '14px',
    },
  },
};
