import { TCssColor } from '#types';
import { ColorDesignSystem } from '../colors';
import { IDesignSystemItem } from '../types/DesignSystemItem';
import { CssVariables } from '../сssVariables';

/**
 * Определение данных дизайн-системы для текста
 */
export class TextDesignSystem implements IDesignSystemItem
{
  // #region Const
  /**
   * Стандартные параметры дизайн-системы для текста для светлой темы
   */
  public static readonly LightDefault = new TextDesignSystem(ColorDesignSystem.LightDefault.colors.dark[9]);

  /**
   * Стандартные параметры дизайн-системы для текста для темной темы
   */
  public static readonly DarkDefault = new TextDesignSystem(ColorDesignSystem.LightDefault.colors.dark[0]);
  // #endregion

  // #region Fields
  /**
   * Цвет текста по умолчанию (зависит от темы)
   */
  public color:TCssColor;
  // #endregion

  constructor(color: TCssColor)
  {
    this.color = color;
  }

  /**
   * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public applyToCssVariable():void
  {
    document.documentElement.style.setProperty(CssVariables.TextColor.match(CssVariables.RegExtractName)![0], this.color);
  }
}

