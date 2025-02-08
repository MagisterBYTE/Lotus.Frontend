import { ThemeColorVariant } from '../theme/types';
import { TCssTextAlign, TTextEffect } from '../types';

/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralTextProperties
{
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
  textColor?:ThemeColorVariant;
}