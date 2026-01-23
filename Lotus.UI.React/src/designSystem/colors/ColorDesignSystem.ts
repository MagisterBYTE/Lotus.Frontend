import { ColorCssPaletteVariants, TColorCssPaletteVariant, TColorToken } from 'lotus-core/modules/color';
import { IDesignSystemItem } from '#designSystem/types';
import { CssVariables } from '#designSystem/сssVariables';
import { TCssColor } from '#types';

/**
 * Набор стандартных цветов для дизайн системы
 */
export class ColorDesignSystem implements IDesignSystemItem
{
  // #region Const
  /**
   * Стандартные цвета дизайн-системы для светлой темы
   */
  public static readonly LightDefault = new ColorDesignSystem('blue', 5, ColorCssPaletteVariants.Light);

  /**
   * Стандартные цвета дизайн-системы для темной темы
   */
  public static readonly DarkDefault = new ColorDesignSystem('blue', 5, ColorCssPaletteVariants.Dark);
  // #endregion

  // #region Fields
  /**
   * Основной цвет
   */
  public primaryColor:TCssColor|TColorToken;

  /**
   * Основной оттенок цвета
   */
  public primaryShade:number;

  /**
   * Набор цветов
   */
  public colors:TColorCssPaletteVariant;
  // #endregion

  constructor(primaryColor: TCssColor|TColorToken, primaryShade: number, colors:TColorCssPaletteVariant)
  {
    this.primaryColor = primaryColor;
    this.primaryShade = primaryShade;
    this.colors = colors;
  }

  /**
   * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public applyToCssVariable():void
  {
    document.documentElement.style.setProperty(CssVariables.PrimaryColor0.match(CssVariables.RegExtractName)![0], this.colors.primary[0]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor1.match(CssVariables.RegExtractName)![0], this.colors.primary[1]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor2.match(CssVariables.RegExtractName)![0], this.colors.primary[2]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor3.match(CssVariables.RegExtractName)![0], this.colors.primary[3]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor4.match(CssVariables.RegExtractName)![0], this.colors.primary[4]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor5.match(CssVariables.RegExtractName)![0], this.colors.primary[5]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor6.match(CssVariables.RegExtractName)![0], this.colors.primary[6]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor7.match(CssVariables.RegExtractName)![0], this.colors.primary[7]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor8.match(CssVariables.RegExtractName)![0], this.colors.primary[8]);
    document.documentElement.style.setProperty(CssVariables.PrimaryColor9.match(CssVariables.RegExtractName)![0], this.colors.primary[9]);
  }
}