import { Assert } from '#utils';
import { Color } from './Color';
import { ColorCssPaletteVariants } from './ColorCssPaletteVariants';
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
  public static getColorCss(color?: string): string | undefined
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

    return color;
  }

  /**
   * Получить корректный цвет для Css с учетом прозрачности
   * @param color Цвет любого типа
   * @param alpha Прозрачность от 0 до 1
   * @returns Корректный цвет для Css с учетом прозрачности или undefined
   */
  public static getColorCssWithAlpha(color?: string, alpha?: number): string | undefined
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
  public static getColorContrastCss(color?: string): string | undefined
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
