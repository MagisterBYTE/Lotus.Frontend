import { TCssBorderColor, TCssBorderRadius, TCssBorderWidth } from '#types';
import { ColorDesignSystem } from '../colors';
import { IDesignSystemItem } from '../types/DesignSystemItem';
import { CssVariables } from '../сssVariables';

/**
 * Определение данных дизайн-системы для границы
 */
export class BorderDesignSystem implements IDesignSystemItem
{
  // #region Const
  /**
   * Стандартные параметры дизайн-системы для границы для светлой темы
   */
  public static readonly LightDefault = new BorderDesignSystem('0.25rem', 'thin', ColorDesignSystem.LightDefault.colors.gray[4], 
    ColorDesignSystem.LightDefault.colors.gray[4]);

  /**
   * Стандартные параметры дизайн-системы для границы для темной темы
   */
  public static readonly DarkDefault = new BorderDesignSystem('0.25rem', 'thin', ColorDesignSystem.LightDefault.colors.dark[4], 
    ColorDesignSystem.LightDefault.colors.dark[4]);
  // #endregion

  // #region Fields
  /**
   * Размер радиуса границы по умолчанию
   */
  public radius:TCssBorderRadius;

  /**
   * Размер толщины границы по умолчанию
   */
  public width:TCssBorderWidth;

  /**
   * Цвет границы по умолчанию (зависит от темы)
   */
  public color:TCssBorderColor;

  /**
   * Цвет тени границы по умолчанию (зависит от темы)
   */
  public shadowColor:TCssBorderColor;
  // #endregion

  constructor(radius: TCssBorderRadius, width: TCssBorderWidth, color:TCssBorderColor, shadowColor:TCssBorderColor)
  {
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.shadowColor = shadowColor;
  }

  /**
   * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public applyToCssVariable():void
  {
    document.documentElement.style.setProperty(CssVariables.BorderColor.match(CssVariables.RegExtractName)![0], this.color);
    document.documentElement.style.setProperty(CssVariables.BorderShadowColor.match(CssVariables.RegExtractName)![0], this.shadowColor);
    document.documentElement.style.setProperty(CssVariables.BorderWidth.match(CssVariables.RegExtractName)![0], this.width.toString());
    document.documentElement.style.setProperty(CssVariables.BorderRadius.match(CssVariables.RegExtractName)![0], this.radius.toString());
  }
}

