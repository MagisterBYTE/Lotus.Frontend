import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { TColorVariantName } from './ColorVariantsTypes';

/**
 * Доступный цвет (может быть цветом темы палитры, семантическим цветом, в том числе с учетом вариативности)
 */
export type TColorToken = `${TColorPalette | TColorSemantic}${Capitalize<TColorVariantName>}` | TColorPalette | TColorSemantic;

export type TColorTokenTupleSemantic = {
  colorSemantic: TColorSemantic;
  colorPalette?: never;
  colorVariant?: TColorVariantName;
};

export type TColorTokenTuplePalette = {
  colorSemantic?: never;
  colorPalette: TColorPalette;
  colorVariant: TColorVariantName;
};

export type TColorTokenTuple = TColorTokenTupleSemantic | TColorTokenTuplePalette;

/**
 * Массив всех возможных типов TColorTokens
 * TColorSemantic типы расположены в начале массива
 */
export const TColorTokens: TColorToken[] = [
  // TColorSemantic типы (в начале)
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',

  // TColorPalette базовые цвета
  'blue',
  'blueGray',
  'indigo',
  'green',
  'teal',
  'yellow',
  'amber',
  'red',
  'brown',
  'gray',
  'dark',

  // TColorSemantic с вариантами
  'primaryWhite',
  'primaryPalest',
  'primaryPale',
  'primaryLighter',
  'primaryLight',
  'primaryMain',
  'primaryDark',
  'primaryDarker',
  'primaryDarkest',
  'primaryBlack',

  'secondaryWhite',
  'secondaryPalest',
  'secondaryPale',
  'secondaryLighter',
  'secondaryLight',
  'secondaryMain',
  'secondaryDark',
  'secondaryDarker',
  'secondaryDarkest',
  'secondaryBlack',

  'errorWhite',
  'errorPalest',
  'errorPale',
  'errorLighter',
  'errorLight',
  'errorMain',
  'errorDark',
  'errorDarker',
  'errorDarkest',
  'errorBlack',

  'warningWhite',
  'warningPalest',
  'warningPale',
  'warningLighter',
  'warningLight',
  'warningMain',
  'warningDark',
  'warningDarker',
  'warningDarkest',
  'warningBlack',

  'infoWhite',
  'infoPalest',
  'infoPale',
  'infoLighter',
  'infoLight',
  'infoMain',
  'infoDark',
  'infoDarker',
  'infoDarkest',
  'infoBlack',

  'successWhite',
  'successPalest',
  'successPale',
  'successLighter',
  'successLight',
  'successMain',
  'successDark',
  'successDarker',
  'successDarkest',
  'successBlack',

  // TColorPalette с вариантами
  'blueWhite',
  'bluePalest',
  'bluePale',
  'blueLighter',
  'blueLight',
  'blueMain',
  'blueDark',
  'blueDarker',
  'blueDarkest',
  'blueBlack',

  'blueGrayWhite',
  'blueGrayPalest',
  'blueGrayPale',
  'blueGrayLighter',
  'blueGrayLight',
  'blueGrayMain',
  'blueGrayDark',
  'blueGrayDarker',
  'blueGrayDarkest',
  'blueGrayBlack',

  'indigoWhite',
  'indigoPalest',
  'indigoPale',
  'indigoLighter',
  'indigoLight',
  'indigoMain',
  'indigoDark',
  'indigoDarker',
  'indigoDarkest',
  'indigoBlack',

  'greenWhite',
  'greenPalest',
  'greenPale',
  'greenLighter',
  'greenLight',
  'greenMain',
  'greenDark',
  'greenDarker',
  'greenDarkest',
  'greenBlack',

  'tealWhite',
  'tealPalest',
  'tealPale',
  'tealLighter',
  'tealLight',
  'tealMain',
  'tealDark',
  'tealDarker',
  'tealDarkest',
  'tealBlack',

  'yellowWhite',
  'yellowPalest',
  'yellowPale',
  'yellowLighter',
  'yellowLight',
  'yellowMain',
  'yellowDark',
  'yellowDarker',
  'yellowDarkest',
  'yellowBlack',

  'amberWhite',
  'amberPalest',
  'amberPale',
  'amberLighter',
  'amberLight',
  'amberMain',
  'amberDark',
  'amberDarker',
  'amberDarkest',
  'amberBlack',

  'redWhite',
  'redPalest',
  'redPale',
  'redLighter',
  'redLight',
  'redMain',
  'redDark',
  'redDarker',
  'redDarkest',
  'redBlack',

  'brownWhite',
  'brownPalest',
  'brownPale',
  'brownLighter',
  'brownLight',
  'brownMain',
  'brownDark',
  'brownDarker',
  'brownDarkest',
  'brownBlack',

  'grayWhite',
  'grayPalest',
  'grayPale',
  'grayLighter',
  'grayLight',
  'grayMain',
  'grayDark',
  'grayDarker',
  'grayDarkest',
  'grayBlack',

  'grayWhite',
  'grayPalest',
  'grayPale',
  'grayLighter',
  'grayLight',
  'grayMain',
  'grayDark',
  'grayDarker',
  'grayDarkest',
  'grayBlack',

  'darkWhite',
  'darkPalest',
  'darkPale',
  'darkLighter',
  'darkLight',
  'darkMain',
  'darkDark',
  'darkDarker',
  'darkDarkest',
  'darkBlack'
];