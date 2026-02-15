import { TCssBackgroundColor } from '#types';
import { ColorDesignSystem } from '../colors';
import { IDesignSystemItem } from '../types/DesignSystemItem';
import { CssVariables } from '../сssVariables';

/**
 * Определение данных дизайн-системы для фона
 */
export class BackgroundDesignSystem implements IDesignSystemItem
{
  // #region Const
  /**
   * Стандартные параметры дизайн-системы для фона для светлой темы
   */
  public static readonly LightDefault = new BackgroundDesignSystem('white');

  /**
   * Стандартные параметры дизайн-системы для фона для темной темы
   */
  public static readonly DarkDefault = new BackgroundDesignSystem(ColorDesignSystem.LightDefault.colors.dark[8]);
  // #endregion

  // #region Fields
  /**
   * Цвет фона по умолчанию (зависит от темы)
   */
  public color:TCssBackgroundColor;
  // #endregion

  constructor(color: TCssBackgroundColor)
  {
    this.color = color;
  }

  /**
   * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public applyToCssVariable():void
  {
    document.documentElement.style.setProperty(CssVariables.BackgroundColor.match(CssVariables.RegExtractName)![0], this.color);
  }
}