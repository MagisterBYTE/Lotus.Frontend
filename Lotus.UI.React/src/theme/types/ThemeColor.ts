import { StringHelper } from 'lotus-core/helpers';
import { ColorVariantsHelper, TColorSemantic, TColorSemantics, TColorVariantName, TColorVariantNames } from 'lotus-core/modules/color';
import { TThemeColorPalette, TThemeColorPalettes } from './ThemeColorPalette';

/**
 * Доступный цвет темы (может быть цветом темы палитры, семантическим цветом, в том числе с учетом вариативности)
 */
export type TThemeColor = `${TThemeColorPalette | TColorSemantic}${Capitalize<TColorVariantName>}` | TThemeColorPalette | TColorSemantic;

export type TThemeColorTupleSemantic = {
  colorSemantic: TColorSemantic;
  colorPalette?: never;
  colorVariant?: TColorVariantName;
};

export type TThemeColorTuplePalette = {
  colorSemantic?: never;
  colorPalette: TThemeColorPalette;
  colorVariant: TColorVariantName;
};

export type TThemeColorTuple = TThemeColorTupleSemantic | TThemeColorTuplePalette;

/**
 * Массив всех возможных типов TThemeColor
 * TColorSemantic типы расположены в начале массива
 */
export const TThemeColors: TThemeColor[] = [
  // TColorSemantic типы (в начале)
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',

  // TThemeColorPalette базовые цвета
  'blue',
  'blueGrey',
  'indigo',
  'green',
  'teal',
  'yellow',
  'amber',
  'red',
  'brown',

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

  // TThemeColorPalette с вариантами
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

  'blueGreyWhite',
  'blueGreyPalest',
  'blueGreyPale',
  'blueGreyLighter',
  'blueGreyLight',
  'blueGreyMain',
  'blueGreyDark',
  'blueGreyDarker',
  'blueGreyDarkest',
  'blueGreyBlack',

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
  'brownBlack'
];

// Создаем Set для быстрого поиска
const themeColorsSet = new Set(TThemeColors);

/**
 * Функция для проверки, является ли цвет доступным цветом темы
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export function instanceOfThemeColor(color: unknown): color is TThemeColor
{
  if (typeof color === 'string')
  {
    return themeColorsSet.has(color as TThemeColor);
  }

  return false;
}

/**
 * Создание вариант доступного цвета темы
 * @param color Тип цвета палитры или семантический тип цвета
 * @param colorVariant Именованный тип в вариативности цветов
 * @returns Доступный цвет темы
 */
export function createThemeColor(color: TThemeColorPalette | TColorSemantic, colorVariant: TColorVariantName): TThemeColor
{
  if (colorVariant === 'main') return color as TThemeColor;
  return `${color}${StringHelper.capitalizeFirstLetter(colorVariant)}` as TThemeColor;
}

/**
 * Деконструкция доступного цвета темы
 * @param color Доступный цвет темы
 * @returns Соответствующий кортеж данных или undefined
 */
export function deconstructionThemeColor(color: unknown): TThemeColorTuple | undefined
{
  // Если color не строка, возвращаем undefined
  if (typeof color !== 'string')
  {
    return undefined;
  }

  // Проверяем, является ли color базовым TColorSemantic
  if (TColorSemantics.includes(color as TColorSemantic))
  {
    return {
      colorSemantic: color as TColorSemantic,
      colorVariant: 'main'
    };
  }

  // Проверяем, является ли color базовым TThemeColorPalette
  if (TThemeColorPalettes.includes(color as TThemeColorPalette))
  {
    // Базовые palette colors считаются с вариантом 'main'
    return {
      colorPalette: color as TThemeColorPalette,
      colorVariant: 'main'
    };
  }

  // Проверяем все возможные варианты
  for (const variant of TColorVariantNames)
  {
    const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);

    // Проверяем для semantic colors
    for (const semantic of TColorSemantics)
    {
      if (color === `${semantic}${capitalizedVariant}`)
      {
        return {
          colorSemantic: semantic,
          colorVariant: variant
        };
      }
    }

    // Проверяем для palette colors
    for (const palette of TThemeColorPalettes)
    {
      if (color === `${palette}${capitalizedVariant}`)
      {
        return {
          colorPalette: palette,
          colorVariant: variant
        };
      }
    }
  }

  // Если не нашли соответствия, возвращаем undefined
  return undefined;
}

/**
 * Получить доступный цвета темы смещенный на указанную величину
 * @param color Доступный цвет темы
 * @returns Смещенный доступный цвет темы
 */
export function nextThemeColor(color: TThemeColor, delta?: number): TThemeColor
{
  const colorTuple = deconstructionThemeColor(color);
  if (colorTuple && colorTuple.colorVariant)
  {
    const colorVariantNext = ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(colorTuple.colorVariant), delta);

    if (colorTuple.colorPalette)
    {
      return createThemeColor(colorTuple.colorPalette, ColorVariantsHelper.getNameByIndex(colorVariantNext));
    }
    if (colorTuple.colorSemantic)
    {
      return createThemeColor(colorTuple.colorSemantic, ColorVariantsHelper.getNameByIndex(colorVariantNext));
    }
  }

  return color;
}
