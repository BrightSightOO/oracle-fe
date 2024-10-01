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
const BACKGROUND_LIST = '#1F2227';
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
const BACKGROUND_GRAY = '#E2E8F0';
const BACKGROUND_HOVER = '#E6E6E6';
const STROKE_GREY = '#D7E4FF';
const CARD_BACKGROUND = '#292D32';
const PRIMARY_RED = '#FF3D00';
const PRIMARY_PINK = '#FF81D2';
const SECONDARY_PINK = '#d80075';
const PRIMARY_GREEN = '#00D495';
const LIGHT_GREEN = '#DAFFF4';
const DARK_GREEN = '#00A77E';
const MAIN_GREEN = '#3AFF1A';
const DARK_RED = '#E04B98';
// Additions for new dark theme
const DARKER_BLUE = '#00244F';
const TEAL = '#00CCFF';
const LIGHT_BLUE_GREY = '#BEDAFB';
const BLACK_TWO = '#000B09';
const BACKGROUND_BLACK = '#1A1A1A';

export const lightTheme = {
	iconPrimary: MEDIUM_GREY,
	backgroundCard: WHITE,
	backgroundCardSecondary: WHITE,
	titleText: BLACK,
	mainLogo: SURFACE_BLUE,

	// white: WHITE,
	// black: BLACK,
	bluePrimary: SURFACE_BLUE,
	backgroundMain: SURFACE_BACKGROUND,
	strokeGrey: STROKE_GREY,
	textGrey: TEXT_GREY,

	textPrimary: BLACK,
	textSecondary: WHITE,

	// LEGACY COLORS - consider using color in new pallete
	// BACKGROUND
	background: BG,
	backgroundGray: BACKGROUND_GRAY,
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
	pinkPrimary: PRIMARY_PINK,
	pinkSecondary: SECONDARY_PINK,
	redSecondary: RED_ERROR,
	redTerniary: SURFACE_RED,
	redSubdued: SURFACE_RED_SUBDUED,
	redLight: SECONDARY_LIGHT_RED,
	redDark: DARK_RED,

	// GREEN
	greenPrimary: PRIMARY_GREEN,
	greenLight: LIGHT_GREEN,
	greenSecondary: SURFACE_GREEN,
	greenDark: DARK_GREEN,
	greenBrightSight: MAIN_GREEN,

	// BRAND
	jupiterBg: '#1D2937',

	// OTHER
	gold: SURFACE_GOLD,
	orange: SURFACE_ORANGE,
	surfaceDefault: WHITE,
};

export const darkThemeNew = {
	iconPrimary: TEAL,
	backgroundCard: DARKER_BLUE,
	backgroundCardSecondary: BACKGROUND_BLACK,
	titleText: LIGHT_BLUE_GREY,
	background: BLACK_TWO,
	bluePrimary: SURFACE_BLUE,
	mainLogo: WHITE,

	backgroundMain: BLACK_TRUE,
	strokeGrey: STROKE_GREY,
	textGrey: TEXT_GREY,

	textPrimary: WHITE,
	textSecondary: BLACK,
	// LEGACY COLORS - consider using color in new pallete
	// BACKGROUND
	backgroundGray: BACKGROUND_GRAY,
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
	pinkPrimary: PRIMARY_PINK,
	pinkSecondary: SECONDARY_PINK,
	redSecondary: RED_ERROR,
	redTerniary: SURFACE_RED_INVERSE,
	redSubdued: SURFACE_RED_SUBDUED_INVERSE,
	redLight: SECONDARY_LIGHT_RED,
	redDark: DARK_RED,

	// GREEN
	greenPrimary: PRIMARY_GREEN,
	greenLight: LIGHT_GREEN,
	greenSecondary: SURFACE_GREEN_INVERSE,
	greenDark: DARK_GREEN,
	greenBrightSight: MAIN_GREEN,

	// BRAND
	jupiterBg: '#1D2937',

	// OTHER
	gold: SURFACE_GOLD_INVERSE,
	orange: SURFACE_ORANGE_INVERSE,
	surfaceDefault: SURFACE_WHITE_INVERSE,
};

export const darkThemeOld = {
	// white: WHITE,
	// black: BLACK,
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
	backgroundList: BACKGROUND_LIST,
	backgroundGray: BACKGROUND_GRAY,
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
	pinkPrimary: PRIMARY_PINK,
	pinkSecondary: SECONDARY_PINK,
	redSecondary: RED_ERROR,
	redTerniary: SURFACE_RED_INVERSE,
	redSubdued: SURFACE_RED_SUBDUED_INVERSE,
	redLight: SECONDARY_LIGHT_RED,
	redDark: DARK_RED,

	// GREEN
	greenPrimary: PRIMARY_GREEN,
	greenLight: LIGHT_GREEN,
	greenSecondary: SURFACE_GREEN_INVERSE,
	greenDark: DARK_GREEN,

	// BRAND
	jupiterBg: '#1D2937',

	// OTHER
	gold: SURFACE_GOLD_INVERSE,
	orange: SURFACE_ORANGE_INVERSE,
	surfaceDefault: SURFACE_WHITE_INVERSE,
};
