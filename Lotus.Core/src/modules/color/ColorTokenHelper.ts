import { StringHelper } from '#helpers';
import { Assert } from '#utils';
import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { TColorToken, TColorTokenTuple } from './ColorToken';
import { ColorVariantsHelper } from './ColorVariantsHelper';
import { TColorVariantName } from './ColorVariantsTypes';

/**
 * Вспомогательный класс для работы с доступным типом цвета
 */
export abstract class ColorTokenHelper
{
  /**
   * Карта для преобразования TColorToken в TColorTokenTuple
   * Доступна только для чтения
   */
  public static readonly ColorTokenMap: ReadonlyMap<TColorToken, TColorTokenTuple> = new Map<TColorToken, TColorTokenTuple>([
    // Семантические базовые цвета (без вариативности)
    ['primary', { colorSemantic: 'primary' }],
    ['secondary', { colorSemantic: 'secondary' }],
    ['error', { colorSemantic: 'error' }],
    ['warning', { colorSemantic: 'warning' }],
    ['info', { colorSemantic: 'info' }],
    ['success', { colorSemantic: 'success' }],

    // Палитры базовые цвета (без вариативности)
    ['blue', { colorPalette: 'blue', colorVariant: 'main' }],
    ['blueGray', { colorPalette: 'blueGray', colorVariant: 'main' }],
    ['indigo', { colorPalette: 'indigo', colorVariant: 'main' }],
    ['green', { colorPalette: 'green', colorVariant: 'main' }],
    ['teal', { colorPalette: 'teal', colorVariant: 'main' }],
    ['yellow', { colorPalette: 'yellow', colorVariant: 'main' }],
    ['amber', { colorPalette: 'amber', colorVariant: 'main' }],
    ['red', { colorPalette: 'red', colorVariant: 'main' }],
    ['brown', { colorPalette: 'brown', colorVariant: 'main' }],
    ['gray', { colorPalette: 'gray', colorVariant: 'main' }],
    ['dark', { colorPalette: 'dark', colorVariant: 'main' }],

    // Семантические цвета с вариативностью
    ['primaryWhite', { colorSemantic: 'primary', colorVariant: 'white' }],
    ['primaryPalest', { colorSemantic: 'primary', colorVariant: 'palest' }],
    ['primaryPale', { colorSemantic: 'primary', colorVariant: 'pale' }],
    ['primaryLighter', { colorSemantic: 'primary', colorVariant: 'lighter' }],
    ['primaryLight', { colorSemantic: 'primary', colorVariant: 'light' }],
    ['primaryMain', { colorSemantic: 'primary', colorVariant: 'main' }],
    ['primaryDark', { colorSemantic: 'primary', colorVariant: 'dark' }],
    ['primaryDarker', { colorSemantic: 'primary', colorVariant: 'darker' }],
    ['primaryDarkest', { colorSemantic: 'primary', colorVariant: 'darkest' }],
    ['primaryBlack', { colorSemantic: 'primary', colorVariant: 'black' }],

    ['secondaryWhite', { colorSemantic: 'secondary', colorVariant: 'white' }],
    ['secondaryPalest', { colorSemantic: 'secondary', colorVariant: 'palest' }],
    ['secondaryPale', { colorSemantic: 'secondary', colorVariant: 'pale' }],
    ['secondaryLighter', { colorSemantic: 'secondary', colorVariant: 'lighter' }],
    ['secondaryLight', { colorSemantic: 'secondary', colorVariant: 'light' }],
    ['secondaryMain', { colorSemantic: 'secondary', colorVariant: 'main' }],
    ['secondaryDark', { colorSemantic: 'secondary', colorVariant: 'dark' }],
    ['secondaryDarker', { colorSemantic: 'secondary', colorVariant: 'darker' }],
    ['secondaryDarkest', { colorSemantic: 'secondary', colorVariant: 'darkest' }],
    ['secondaryBlack', { colorSemantic: 'secondary', colorVariant: 'black' }],

    ['errorWhite', { colorSemantic: 'error', colorVariant: 'white' }],
    ['errorPalest', { colorSemantic: 'error', colorVariant: 'palest' }],
    ['errorPale', { colorSemantic: 'error', colorVariant: 'pale' }],
    ['errorLighter', { colorSemantic: 'error', colorVariant: 'lighter' }],
    ['errorLight', { colorSemantic: 'error', colorVariant: 'light' }],
    ['errorMain', { colorSemantic: 'error', colorVariant: 'main' }],
    ['errorDark', { colorSemantic: 'error', colorVariant: 'dark' }],
    ['errorDarker', { colorSemantic: 'error', colorVariant: 'darker' }],
    ['errorDarkest', { colorSemantic: 'error', colorVariant: 'darkest' }],
    ['errorBlack', { colorSemantic: 'error', colorVariant: 'black' }],

    ['warningWhite', { colorSemantic: 'warning', colorVariant: 'white' }],
    ['warningPalest', { colorSemantic: 'warning', colorVariant: 'palest' }],
    ['warningPale', { colorSemantic: 'warning', colorVariant: 'pale' }],
    ['warningLighter', { colorSemantic: 'warning', colorVariant: 'lighter' }],
    ['warningLight', { colorSemantic: 'warning', colorVariant: 'light' }],
    ['warningMain', { colorSemantic: 'warning', colorVariant: 'main' }],
    ['warningDark', { colorSemantic: 'warning', colorVariant: 'dark' }],
    ['warningDarker', { colorSemantic: 'warning', colorVariant: 'darker' }],
    ['warningDarkest', { colorSemantic: 'warning', colorVariant: 'darkest' }],
    ['warningBlack', { colorSemantic: 'warning', colorVariant: 'black' }],

    ['infoWhite', { colorSemantic: 'info', colorVariant: 'white' }],
    ['infoPalest', { colorSemantic: 'info', colorVariant: 'palest' }],
    ['infoPale', { colorSemantic: 'info', colorVariant: 'pale' }],
    ['infoLighter', { colorSemantic: 'info', colorVariant: 'lighter' }],
    ['infoLight', { colorSemantic: 'info', colorVariant: 'light' }],
    ['infoMain', { colorSemantic: 'info', colorVariant: 'main' }],
    ['infoDark', { colorSemantic: 'info', colorVariant: 'dark' }],
    ['infoDarker', { colorSemantic: 'info', colorVariant: 'darker' }],
    ['infoDarkest', { colorSemantic: 'info', colorVariant: 'darkest' }],
    ['infoBlack', { colorSemantic: 'info', colorVariant: 'black' }],

    ['successWhite', { colorSemantic: 'success', colorVariant: 'white' }],
    ['successPalest', { colorSemantic: 'success', colorVariant: 'palest' }],
    ['successPale', { colorSemantic: 'success', colorVariant: 'pale' }],
    ['successLighter', { colorSemantic: 'success', colorVariant: 'lighter' }],
    ['successLight', { colorSemantic: 'success', colorVariant: 'light' }],
    ['successMain', { colorSemantic: 'success', colorVariant: 'main' }],
    ['successDark', { colorSemantic: 'success', colorVariant: 'dark' }],
    ['successDarker', { colorSemantic: 'success', colorVariant: 'darker' }],
    ['successDarkest', { colorSemantic: 'success', colorVariant: 'darkest' }],
    ['successBlack', { colorSemantic: 'success', colorVariant: 'black' }],

    // Палитры с вариативностью
    ['blueWhite', { colorPalette: 'blue', colorVariant: 'white' }],
    ['bluePalest', { colorPalette: 'blue', colorVariant: 'palest' }],
    ['bluePale', { colorPalette: 'blue', colorVariant: 'pale' }],
    ['blueLighter', { colorPalette: 'blue', colorVariant: 'lighter' }],
    ['blueLight', { colorPalette: 'blue', colorVariant: 'light' }],
    ['blueMain', { colorPalette: 'blue', colorVariant: 'main' }],
    ['blueDark', { colorPalette: 'blue', colorVariant: 'dark' }],
    ['blueDarker', { colorPalette: 'blue', colorVariant: 'darker' }],
    ['blueDarkest', { colorPalette: 'blue', colorVariant: 'darkest' }],
    ['blueBlack', { colorPalette: 'blue', colorVariant: 'black' }],

    ['blueGrayWhite', { colorPalette: 'blueGray', colorVariant: 'white' }],
    ['blueGrayPalest', { colorPalette: 'blueGray', colorVariant: 'palest' }],
    ['blueGrayPale', { colorPalette: 'blueGray', colorVariant: 'pale' }],
    ['blueGrayLighter', { colorPalette: 'blueGray', colorVariant: 'lighter' }],
    ['blueGrayLight', { colorPalette: 'blueGray', colorVariant: 'light' }],
    ['blueGrayMain', { colorPalette: 'blueGray', colorVariant: 'main' }],
    ['blueGrayDark', { colorPalette: 'blueGray', colorVariant: 'dark' }],
    ['blueGrayDarker', { colorPalette: 'blueGray', colorVariant: 'darker' }],
    ['blueGrayDarkest', { colorPalette: 'blueGray', colorVariant: 'darkest' }],
    ['blueGrayBlack', { colorPalette: 'blueGray', colorVariant: 'black' }],

    ['indigoWhite', { colorPalette: 'indigo', colorVariant: 'white' }],
    ['indigoPalest', { colorPalette: 'indigo', colorVariant: 'palest' }],
    ['indigoPale', { colorPalette: 'indigo', colorVariant: 'pale' }],
    ['indigoLighter', { colorPalette: 'indigo', colorVariant: 'lighter' }],
    ['indigoLight', { colorPalette: 'indigo', colorVariant: 'light' }],
    ['indigoMain', { colorPalette: 'indigo', colorVariant: 'main' }],
    ['indigoDark', { colorPalette: 'indigo', colorVariant: 'dark' }],
    ['indigoDarker', { colorPalette: 'indigo', colorVariant: 'darker' }],
    ['indigoDarkest', { colorPalette: 'indigo', colorVariant: 'darkest' }],
    ['indigoBlack', { colorPalette: 'indigo', colorVariant: 'black' }],

    ['greenWhite', { colorPalette: 'green', colorVariant: 'white' }],
    ['greenPalest', { colorPalette: 'green', colorVariant: 'palest' }],
    ['greenPale', { colorPalette: 'green', colorVariant: 'pale' }],
    ['greenLighter', { colorPalette: 'green', colorVariant: 'lighter' }],
    ['greenLight', { colorPalette: 'green', colorVariant: 'light' }],
    ['greenMain', { colorPalette: 'green', colorVariant: 'main' }],
    ['greenDark', { colorPalette: 'green', colorVariant: 'dark' }],
    ['greenDarker', { colorPalette: 'green', colorVariant: 'darker' }],
    ['greenDarkest', { colorPalette: 'green', colorVariant: 'darkest' }],
    ['greenBlack', { colorPalette: 'green', colorVariant: 'black' }],

    ['tealWhite', { colorPalette: 'teal', colorVariant: 'white' }],
    ['tealPalest', { colorPalette: 'teal', colorVariant: 'palest' }],
    ['tealPale', { colorPalette: 'teal', colorVariant: 'pale' }],
    ['tealLighter', { colorPalette: 'teal', colorVariant: 'lighter' }],
    ['tealLight', { colorPalette: 'teal', colorVariant: 'light' }],
    ['tealMain', { colorPalette: 'teal', colorVariant: 'main' }],
    ['tealDark', { colorPalette: 'teal', colorVariant: 'dark' }],
    ['tealDarker', { colorPalette: 'teal', colorVariant: 'darker' }],
    ['tealDarkest', { colorPalette: 'teal', colorVariant: 'darkest' }],
    ['tealBlack', { colorPalette: 'teal', colorVariant: 'black' }],

    ['yellowWhite', { colorPalette: 'yellow', colorVariant: 'white' }],
    ['yellowPalest', { colorPalette: 'yellow', colorVariant: 'palest' }],
    ['yellowPale', { colorPalette: 'yellow', colorVariant: 'pale' }],
    ['yellowLighter', { colorPalette: 'yellow', colorVariant: 'lighter' }],
    ['yellowLight', { colorPalette: 'yellow', colorVariant: 'light' }],
    ['yellowMain', { colorPalette: 'yellow', colorVariant: 'main' }],
    ['yellowDark', { colorPalette: 'yellow', colorVariant: 'dark' }],
    ['yellowDarker', { colorPalette: 'yellow', colorVariant: 'darker' }],
    ['yellowDarkest', { colorPalette: 'yellow', colorVariant: 'darkest' }],
    ['yellowBlack', { colorPalette: 'yellow', colorVariant: 'black' }],

    ['amberWhite', { colorPalette: 'amber', colorVariant: 'white' }],
    ['amberPalest', { colorPalette: 'amber', colorVariant: 'palest' }],
    ['amberPale', { colorPalette: 'amber', colorVariant: 'pale' }],
    ['amberLighter', { colorPalette: 'amber', colorVariant: 'lighter' }],
    ['amberLight', { colorPalette: 'amber', colorVariant: 'light' }],
    ['amberMain', { colorPalette: 'amber', colorVariant: 'main' }],
    ['amberDark', { colorPalette: 'amber', colorVariant: 'dark' }],
    ['amberDarker', { colorPalette: 'amber', colorVariant: 'darker' }],
    ['amberDarkest', { colorPalette: 'amber', colorVariant: 'darkest' }],
    ['amberBlack', { colorPalette: 'amber', colorVariant: 'black' }],

    ['redWhite', { colorPalette: 'red', colorVariant: 'white' }],
    ['redPalest', { colorPalette: 'red', colorVariant: 'palest' }],
    ['redPale', { colorPalette: 'red', colorVariant: 'pale' }],
    ['redLighter', { colorPalette: 'red', colorVariant: 'lighter' }],
    ['redLight', { colorPalette: 'red', colorVariant: 'light' }],
    ['redMain', { colorPalette: 'red', colorVariant: 'main' }],
    ['redDark', { colorPalette: 'red', colorVariant: 'dark' }],
    ['redDarker', { colorPalette: 'red', colorVariant: 'darker' }],
    ['redDarkest', { colorPalette: 'red', colorVariant: 'darkest' }],
    ['redBlack', { colorPalette: 'red', colorVariant: 'black' }],

    ['brownWhite', { colorPalette: 'brown', colorVariant: 'white' }],
    ['brownPalest', { colorPalette: 'brown', colorVariant: 'palest' }],
    ['brownPale', { colorPalette: 'brown', colorVariant: 'pale' }],
    ['brownLighter', { colorPalette: 'brown', colorVariant: 'lighter' }],
    ['brownLight', { colorPalette: 'brown', colorVariant: 'light' }],
    ['brownMain', { colorPalette: 'brown', colorVariant: 'main' }],
    ['brownDark', { colorPalette: 'brown', colorVariant: 'dark' }],
    ['brownDarker', { colorPalette: 'brown', colorVariant: 'darker' }],
    ['brownDarkest', { colorPalette: 'brown', colorVariant: 'darkest' }],
    ['brownBlack', { colorPalette: 'brown', colorVariant: 'black' }],

    ['grayWhite', { colorPalette: 'gray', colorVariant: 'white' }],
    ['grayPalest', { colorPalette: 'gray', colorVariant: 'palest' }],
    ['grayPale', { colorPalette: 'gray', colorVariant: 'pale' }],
    ['grayLighter', { colorPalette: 'gray', colorVariant: 'lighter' }],
    ['grayLight', { colorPalette: 'gray', colorVariant: 'light' }],
    ['grayMain', { colorPalette: 'gray', colorVariant: 'main' }],
    ['grayDark', { colorPalette: 'gray', colorVariant: 'dark' }],
    ['grayDarker', { colorPalette: 'gray', colorVariant: 'darker' }],
    ['grayDarkest', { colorPalette: 'gray', colorVariant: 'darkest' }],
    ['grayBlack', { colorPalette: 'gray', colorVariant: 'black' }],

    ['darkWhite', { colorPalette: 'dark', colorVariant: 'white' }],
    ['darkPalest', { colorPalette: 'dark', colorVariant: 'palest' }],
    ['darkPale', { colorPalette: 'dark', colorVariant: 'pale' }],
    ['darkLighter', { colorPalette: 'dark', colorVariant: 'lighter' }],
    ['darkLight', { colorPalette: 'dark', colorVariant: 'light' }],
    ['darkMain', { colorPalette: 'dark', colorVariant: 'main' }],
    ['darkDark', { colorPalette: 'dark', colorVariant: 'dark' }],
    ['darkDarker', { colorPalette: 'dark', colorVariant: 'darker' }],
    ['darkDarkest', { colorPalette: 'dark', colorVariant: 'darkest' }],
    ['darkBlack', { colorPalette: 'dark', colorVariant: 'black' }]
  ]);

  /**
   * Функция для проверки, является ли цвет доступным цветом
   * @param color Проверяемый цвет
   * @returns Статус проверки
   */
  public static instanceOf(color: unknown): color is TColorToken
  {
    if (typeof color === 'string')
    {
      return ColorTokenHelper.ColorTokenMap.has(color as TColorToken);
    }

    return false;
  }

  /**
   * Создание вариант доступного цвета
   * @param color Цвета палитры или семантический тип цвета
   * @param colorVariant Именованный тип в вариативности цветов
   * @returns Доступный цвет
   */
  public static create(color: TColorPalette | TColorSemantic, colorVariant: TColorVariantName): TColorToken
  {
    if (colorVariant === 'main') return color as TColorToken;
    return `${color}${StringHelper.capitalizeFirstLetter(colorVariant)}` as TColorToken;
  }

  /**
   * Проверить, является ли токен семантическим
   */
  public static isSemanticToken(token: TColorToken): boolean
  {
    const tuple = ColorTokenHelper.ColorTokenMap.get(token);
    if (!tuple) return false;
    return 'colorSemantic' in tuple && tuple.colorSemantic !== undefined;
  }

  /**
   * Проверить, является ли токен палитрой
   */
  public static isPaletteToken(token: TColorToken): boolean
  {
    const tuple = ColorTokenHelper.ColorTokenMap.get(token);
    if (!tuple) return false;
    return 'colorPalette' in tuple && tuple.colorPalette !== undefined;
  }

  /**
   * Получить вариацию цвета из токена
   */
  public static getVariantFromToken(token: TColorToken): TColorVariantName
  {
    const tuple = ColorTokenHelper.ColorTokenMap.get(token);
    if (!tuple)
    {
      throw new Error(`Invalid color token: ${token}`);
    }

    // Если вариация не указана явно, используем 'main' по умолчанию
    return tuple.colorVariant || 'main';
  }

  /**
   * Получить базовое имя цвета из токена (без вариации)
   */
  public static getBaseColorFromToken(token: TColorToken): string
  {
    const tuple = ColorTokenHelper.ColorTokenMap.get(token);
    if (!tuple)
    {
      throw new Error(`Invalid color token: ${token}`);
    }

    if ('colorSemantic' in tuple && tuple.colorSemantic)
    {
      return tuple.colorSemantic;
    }
    else if ('colorPalette' in tuple && tuple.colorPalette)
    {
      return tuple.colorPalette;
    }

    throw new Error(`Unable to extract base color from token: ${token}`);
  }

  /**
   * Деконструкция доступного цвета
   * @param color Доступный цвет
   * @returns Соответствующий кортеж данных или undefined
   */
  public static deconstruction(color: unknown): TColorTokenTuple | undefined
  {
    // Если color не строка, возвращаем undefined
    if (typeof color !== 'string')
    {
      return undefined;
    }

    if (ColorTokenHelper.ColorTokenMap.has(color as TColorSemantic))
    {
      const tuple = ColorTokenHelper.ColorTokenMap.get(color as TColorSemantic);
      return tuple;
    }

    // Если не нашли соответствия, возвращаем undefined
    return undefined;
  }

  /**
   * Получить доступный цвета смещенный на указанную величину
   * @param color Доступный цвет
   * @returns Смещенный доступный цвет
   */
  public static next(color: unknown, delta?: number): TColorToken|undefined
  {
    if (Assert.emptyValue(color)) return undefined;
    
    const colorTuple = ColorTokenHelper.deconstruction(color);
    if (colorTuple && colorTuple.colorVariant)
    {
      const colorVariantNext = ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(colorTuple.colorVariant), delta);

      if (colorTuple.colorPalette)
      {
        return ColorTokenHelper.create(colorTuple.colorPalette, ColorVariantsHelper.getNameByIndex(colorVariantNext));
      }
      if (colorTuple.colorSemantic)
      {
        return ColorTokenHelper.create(colorTuple.colorSemantic, ColorVariantsHelper.getNameByIndex(colorVariantNext));
      }
    }

    return undefined;
  }
}
