const WHITE = '#FFFFFF';
const BLACK = '#1F2124';
const BLACK_TRUE = '#000000';
const DARK_GREY = '#7C7B7C';
const MEDIUM_GREY = '#8F9399';
const LIGHT_GREY = '#B3B3B3';
const LIGHT_GREY2 = '#DBE7FF';
const LIGHT_GREY3 = '#E5EAF6';
const TEXT_GREY = '#8C98B1';
const BG = '#F2F3F3';
const SURFACE_WHITE_INVERSE = '#000A20';
const SURFACE_DARK_BLUE = '#012169';
const SURFACE_DARK_BLUE_INVERSE = '#0F358F';
const SURFACE_BLUE = '#0074FF';
const HOVER_BLUE = '#105EBC';
const SURFACE_LIGHT_BLUE_SUBDUED = '#F5FAFD';
const SURFACE_LIGHT_BLUE_SUBDUED_INVERSE = '#001831';
const SURFACE_GREEN = '#00B140';
const SURFACE_GREEN_INVERSE = '#4CA76E';
const SURFACE_RED = '#9C182F';
const SURFACE_RED_INVERSE = '#E3787D';
const SURFACE_RED_SUBDUED = '#F9F3F4';
const SURFACE_RED_SUBDUED_INVERSE = '#62182D';
const SURFACE_GOLD = '#FFCF25';
const SURFACE_GOLD_INVERSE = '#F4C727';
const SURFACE_ORANGE = '#FF5924';
const SURFACE_ORANGE_INVERSE = '#EA5E32';
const SECONDARY_LIGHT_RED = '#FFE9F6';
const RED_ERROR = '#D93025';
const TAB_INACTIVE = '#868B96';
const SURFACE_BACKGROUND = '#F3F5FB';
const BACKGROUND_HOVER = '#E6E6E6';
const STROKE_GREY = '#D7E4FF';
const CARD_BACKGROUND = '#292D32';
const PRIMARY_RED = '#FF3D00';
const PRIMARY_GREEN = '#00D495';
const SUBTLE_GREEN = '#02BF86';

export const lightTheme = {
  white: WHITE,
  black: SUBTLE_GREEN,
  bluePrimary: SURFACE_BLUE,
  backgroundMain: SURFACE_BACKGROUND,
  strokeGrey: STROKE_GREY,
  textGrey: TEXT_GREY,

  textPrimary: BLACK,
  textSecondary: WHITE,

  // LEGACY COLORS - consider using color in new pallete
  // BACKGROUND
  background: BG,
  backgroundCard: WHITE,
  backgroundHover: BACKGROUND_HOVER,
  backgroundTool: LIGHT_GREY2,

  // GREY
  greyDark: DARK_GREY,
  greyMedium: MEDIUM_GREY,
  greyMedium2: TAB_INACTIVE,
  greyLight: LIGHT_GREY,
  greyLight2: LIGHT_GREY2,
  greyLight3: LIGHT_GREY3,

  // BLUE
  blueDark: SURFACE_DARK_BLUE,
  blueSubdued: SURFACE_LIGHT_BLUE_SUBDUED,
  blueHover: HOVER_BLUE,

  // RED
  redPrimary: PRIMARY_RED,
  redSecondary: RED_ERROR,
  redTerniary: SURFACE_RED,
  redSubdued: SURFACE_RED_SUBDUED,
  red4: SECONDARY_LIGHT_RED,

  // GREEN
  greenPrimary: PRIMARY_GREEN,
  greenSecondary: SURFACE_GREEN,

  // OTHER
  gold: SURFACE_GOLD,
  orange: SURFACE_ORANGE,
  surfaceDefault: WHITE,

  gradientPrimary:
    'linear-gradient(91.96deg, rgba(0, 115, 255, 0.06) 0.09%, rgba(0, 115, 255, 0.15) 100.27%)',
  gradientSecondary:
    'linear-gradient(262.51deg, #41DBFD -5.26%, #0074FF 52.09%, #0D59B4 109.44%)',
};

export const darkTheme = {
  white: WHITE,
  black: BLACK,
  bluePrimary: SURFACE_BLUE,
  backgroundMain: BLACK_TRUE,
  strokeGrey: STROKE_GREY,
  textGrey: TEXT_GREY,

  textPrimary: WHITE,
  textSecondary: BLACK,
  // LEGACY COLORS - consider using color in new pallete
  // BACKGROUND
  background: BG,
  backgroundCard: CARD_BACKGROUND,
  backgroundHover: BACKGROUND_HOVER,
  backgroundTool: BLACK,

  // GREY
  greyDark: DARK_GREY,
  greyMedium: MEDIUM_GREY,
  greyMedium2: TAB_INACTIVE,
  greyLight: LIGHT_GREY,
  greyLight2: LIGHT_GREY2,
  greyLight3: LIGHT_GREY3,

  // BLUE
  blueDark: SURFACE_DARK_BLUE_INVERSE,
  blueSubdued: SURFACE_LIGHT_BLUE_SUBDUED_INVERSE,
  blueHover: HOVER_BLUE,

  // RED
  redPrimary: PRIMARY_RED,
  redSecondary: RED_ERROR,
  redTerniary: SURFACE_RED_INVERSE,
  redSubdued: SURFACE_RED_SUBDUED_INVERSE,
  red4: SECONDARY_LIGHT_RED,

  // GREEN
  greenPrimary: PRIMARY_GREEN,
  greenSecondary: SURFACE_GREEN_INVERSE,

  // OTHER
  gold: SURFACE_GOLD_INVERSE,
  orange: SURFACE_ORANGE_INVERSE,
  surfaceDefault: SURFACE_WHITE_INVERSE,

  gradientPrimary:
    'linear-gradient(91.96deg, #0073FF 0.09%, rgba(0, 115, 255, 0.66) 100.27%)',
  gradientSecondary:
    'linear-gradient(262.51deg, #41DBFD -5.26%, #0074FF 52.09%, #0D59B4 109.44%)',
};
