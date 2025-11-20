import { TCssPadding, TElementSpacing } from '#types';

/**
 * Общие свойства внешних отступов элемента UI
 */
export interface IGeneralMarginProperties 
{
  /**
   * Внешний отступ
   */
  m?: TCssPadding | TElementSpacing;

  /**
   * Внешний отступ слева
   */
  ml?: TCssPadding | TElementSpacing;

  /**
   * Внешний отступ сверху
   */
  mt?: TCssPadding | TElementSpacing;

  /**
   * Внешний отступ справа
   */
  mr?: TCssPadding | TElementSpacing;

  /**
   * Внешний отступ снизу
   */
  mb?: TCssPadding | TElementSpacing;
}