import { TCssFontFamily, TFontAccent } from '#types';
import { DesignSystemConstants } from '../DesignSystemConstants';
import { IDesignSystemItem } from '../types/DesignSystemItem';
import { CssVariables } from '../сssVariables';

/**
 * Определение данных дизайн-системы для шрифтов
 */
export class FontDesignSystem implements IDesignSystemItem
{
  // #region Const
  /**
   * Стандартные параметры дизайн-системы для шрифтов
   */
  public static readonly Default = new FontDesignSystem(DesignSystemConstants.FontDefault, DesignSystemConstants.FontMonospace, DesignSystemConstants.FontAccent);
  // #endregion

  // #region Static methods
  /**
   * Получить значение шрифта через переменную Css
   * @param value Семейство или акцент шрифта
   */
  public static getFromCssVariable(value?: TCssFontFamily|TFontAccent): TCssFontFamily | undefined
  {
    if (value === undefined) return undefined;

    switch (value as TFontAccent)
    {
      case 'default':
        return CssVariables.FontFamily;
      case 'accent':
        return CssVariables.FontFamilyAccent;
      case 'monospace':
        return CssVariables.FontFamilyMonospace;
    }

    return value;
  }
  // #endregion

  // #region Fields
  /**
   * Основной шрифт
   */
  public normal:TCssFontFamily;

  /**
   * Моноширинный шрифт
   */
  public monospace:TCssFontFamily;

  /**
   * Шрифт для акцента данных
   */
  public accent:TCssFontFamily;
  // #endregion

  constructor(normal: TCssFontFamily, monospace: TCssFontFamily, accent:TCssFontFamily)
  {
    this.normal = normal;
    this.monospace = monospace;
    this.accent = accent;
  }

  /**
   * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public applyToCssVariable():void
  {
    document.documentElement.style.setProperty(CssVariables.FontFamily.match(CssVariables.RegExtractName)![0], this.normal);
    document.documentElement.style.setProperty(CssVariables.FontFamilyMonospace.match(CssVariables.RegExtractName)![0], this.monospace);
    document.documentElement.style.setProperty(CssVariables.FontFamilyAccent.match(CssVariables.RegExtractName)![0], this.accent);
  }
}

