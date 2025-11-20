import { TCssPadding, TElementSpacing } from '#types';

/**
 * Общие свойства внутренних отступов элемента UI
 */
export interface IGeneralPaddingProperties 
{
  /**
   * Внутренний отступ
   */
  p?: TCssPadding | TElementSpacing;

  /**
   * Внутренний отступ слева
   */
  pl?: TCssPadding | TElementSpacing;

  /**
   * Внутренний отступ сверху
   */
  pt?: TCssPadding | TElementSpacing;

  /**
   * Внутренний отступ справа
   */
  pr?: TCssPadding | TElementSpacing;

  /**
   * Внутренний отступ снизу
   */
  pb?: TCssPadding | TElementSpacing;
}