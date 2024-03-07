export const components = {
  Button: {
    baseStyle: {},
    variants: {
      primaryAction: {
        py: 2,
        px: 4,
        bg: 'bluePrimary',
        color: 'white',
        _hover: { bg: 'blueHover' },
        _disabled: {
          _hover: {
            background: 'blueHover' + ' !important',
          },
          opacity: 0.3,
          cursor: 'not-allowed',
        },
      },
      primaryActionOutline: {
        py: 2,
        px: 4,
        color: 'bluePrimary',
        border: '1px solid',
        borderColor: 'bluePrimary',
        _hover: {
          bg: 'blueHover',
          color: 'white',
        },
        _disabled: {
          _hover: {
            background: 'blueHover' + ' !important',
            color: 'white' + ' !important',
          },
          opacity: 0.3,
          cursor: 'not-allowed',
        },
      },
      secondaryAction: {
        py: 2,
        px: 4,
        bg: 'white',
        color: 'bluePrimary',
        _hover: {
          bg: 'blueHover',
          color: 'white',
        },
        _disabled: {
          _hover: {
            background: 'blueHover' + ' !important',
          },
          opacity: 0.3,
          cursor: 'not-allowed',
        },
      },
      darkButton: {
        py: 2,
        px: 4,
        bg: 'greyDark',
        color: 'white',
        _hover: {
          bg: 'greyMedium',
          color: 'white',
        },
        _disabled: {
          _hover: {
            background: 'greyDark' + ' !important',
          },
          opacity: 0.75,
          cursor: 'not-allowed',
        },
      },
      warning: {
        bg: 'redSubdued',
        color: 'white',
        _hover: { bg: 'redSubdued' },
        _disabled: {
          _hover: {
            background: 'red4' + ' !important',
          },
          opacity: 0.3,
          cursor: 'not-allowed',
        },
      },
      starAtlasPrimary: {
        bg: 'starAtlas.orangePrimary',
        fontWeight: '500',
        width: '100%',
        borderRadius: 'none',
        maxWidth: '335px',
        color: 'black',
        fontSize: '16px',
        height: '40px',
        _hover: { bg: 'starAtlas.orangeSecondary' },
        _disabled: {
          bg: 'starAtlas.orangeSecondary !important',
          opacity: 0.2,
          _hover: { opacity: 0.2 },
        },
      },
      starAtlasSecondary: {
        fontWeight: '500',
        width: '100%',
        maxWidth: '335px',
        borderRadius: 'none',
        color: 'starAtlas.orangePrimary',
        fontSize: '16px',
        height: '40px',
        border: '1px solid',
        borderColor: 'starAtlas.orangePrimary',
        _hover: {
          color: 'starAtlas.orangeSecondary',
          borderColor: 'starAtlas.orangePrimary',
        },
        _disabled: {
          background: 'black !important',
          opacity: 0.2,
          _hover: { opacity: 0.2, translate: '0 0' },
        },
      },
    },
  },
  Progress: {
    baseStyle: {
      filledTrack: {
        bg: 'lightGrey',
      },
    },
  },
};
