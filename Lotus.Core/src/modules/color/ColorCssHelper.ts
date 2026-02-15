import { Assert } from '#utils';
import { Color } from './Color';
import { ColorCssPaletteVariants } from './ColorCssPaletteVariants';
import { ColorHelper } from './ColorHelper';
import { ColorPaletteVariants } from './ColorPaletteVariants';
import { ColorTokenHelper } from './ColorTokenHelper';
import { ColorVariantsHelper } from './ColorVariantsHelper';

/**
 * Вспомогательный класс для работы c цветом для Css
 */
export abstract class ColorCssHelper
{
  // #region Fields
  public static isLight: boolean = true;
  // #endregion

  // #region Methods
  /**
   * Получить корректный цвет для Css
   * @param color Цвет любого типа
   * @returns Корректный цвет для Css или undefined
   */
  public static getColor(color?: string): string | undefined
  {
    if (Assert.emptyValue(color)) return undefined;

    if (ColorTokenHelper.instanceOf(color))
    {
      const tuple = ColorTokenHelper.deconstruction(color)!;
      const index = ColorVariantsHelper.getIndexByName(tuple.colorVariant) - 1;
      if (tuple.colorPalette)
      {
        if (ColorCssHelper.isLight)
        {
          const colorCss = ColorCssPaletteVariants.Light[tuple.colorPalette][index];
          return colorCss;
        }
        else
        {
          const colorCss = ColorCssPaletteVariants.Dark[tuple.colorPalette][index];
          return colorCss;
        }
      }
      else
      {
        if (ColorCssHelper.isLight)
        {
          const colorCss = ColorCssPaletteVariants.Light[tuple.colorSemantic][index];
          return colorCss;
        }
        else
        {
          const colorCss = ColorCssPaletteVariants.Dark[tuple.colorSemantic][index];
          return colorCss;
        }
      }
    }

    const rgb = ColorHelper.getColorName(color);
    if (Assert.existValue<number[]>(rgb))
    {
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    return color;
  }

  /**
   * Получить корректный цвет для Css с учетом прозрачности
   * @param color Цвет любого типа
   * @param alpha Прозрачность от 0 до 1
   * @returns Корректный цвет для Css с учетом прозрачности или undefined
   */
  public static getColorWithAlpha(color?: string, alpha?: number): string | undefined
  {
    if (Assert.emptyValue(color)) return undefined;

    if (ColorTokenHelper.instanceOf(color))
    {
      const tuple = ColorTokenHelper.deconstruction(color)!;
      const index = ColorVariantsHelper.getIndexByName(tuple.colorVariant);
      if (tuple.colorPalette)
      {
        if (ColorCssHelper.isLight)
        {
          const colorValue = ColorPaletteVariants.Light[tuple.colorPalette].getByIndex(index);
          return colorValue.toCSSRgbValue(alpha);
        }
        else
        {
          const colorValue = ColorPaletteVariants.Dark[tuple.colorPalette].getByIndex(index);
          return colorValue.toCSSRgbValue(alpha);
        }
      }
      else
      {
        if (ColorCssHelper.isLight)
        {
          const colorValue = ColorPaletteVariants.Light[tuple.colorSemantic].getByIndex(index);
          return colorValue.toCSSRgbValue(alpha);
        }
        else
        {
          const colorValue = ColorPaletteVariants.Dark[tuple.colorSemantic].getByIndex(index);
          return colorValue.toCSSRgbValue(alpha);
        }
      }
    }

    const colorValue = new Color(color);

    return colorValue.toCSSRgbValue(alpha);
  }

  /**
   * Получить контрастный корректный цвет для Css
   * @param color Цвет любого типа
   * @returns Контрастный корректный цвет для Css или undefined
   */
  public static getColorContrast(color?: string): string | undefined
  {
    if (Assert.emptyValue(color)) return undefined;

    if (ColorTokenHelper.instanceOf(color))
    {
      const tuple = ColorTokenHelper.deconstruction(color)!;
      const begin = ColorVariantsHelper.getIndexByName(tuple.colorVariant);
      const index = ColorVariantsHelper.getNextIndex(begin, 5) - 1;
      if (tuple.colorPalette)
      {
        if (ColorCssHelper.isLight)
        {
          const colorCss = ColorCssPaletteVariants.Light[tuple.colorPalette][index];
          return colorCss;
        }
        else
        {
          const colorCss = ColorCssPaletteVariants.Dark[tuple.colorPalette][index];
          return colorCss;
        }
      }
      else
      {
        if (ColorCssHelper.isLight)
        {
          const colorCss = ColorCssPaletteVariants.Light[tuple.colorSemantic][index];
          return colorCss;
        }
        else
        {
          const colorCss = ColorCssPaletteVariants.Dark[tuple.colorSemantic][index];
          return colorCss;
        }
      }
    }

    return color;
  }
  // #endregion
}
