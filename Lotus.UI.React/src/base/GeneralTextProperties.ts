import { TThemeColor } from "#theme/types";
import { TTextEffect, TCssTextAlign, TCssFontSize, TFontSize, TCssLineHeight, TLineSpacing } from "#types";

/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralTextProperties
{
  /**
   * Размер шрифта
   */
  fontSize?: TCssFontSize|TFontSize;

  /**
   * Статус жирного шрифта
   */
  fontBold?: boolean;

  /**
   * Использовать шрифт для акцента внимания
   */
  fontAccent?: boolean;

  /**
   * Тип эффекта для текста
   */
  textEffect?:TTextEffect;

  /**
   * Выравнивание текста по горизонтали внутри блока
   */
  textAlign?:TCssTextAlign;

  /**
   * Использовать гармоничный цвет текста, а не контрастный
   */
  textColorHarmonious?:boolean;

  /**
   * Цвет текста
   */
  textColor?:TThemeColor;

  /**
   * Межстрочный интервал текста
   */
  textLineSpacing?:TCssLineHeight | TLineSpacing;
}