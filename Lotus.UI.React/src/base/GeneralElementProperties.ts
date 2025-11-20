import { TElementSize } from '#types';
import { IGeneralBackgroundProperties } from './GeneralBackgroundProperties';
import { IGeneralBorderProperties } from './GeneralBorderProperties';
import { IGeneralTextProperties } from './GeneralTextProperties';

/**
 * Базовые свойства для элемента UI
 */
export interface IGeneralBaseElementProperties 
{
  /**
   * Размер элемента
   */
  size?: TElementSize;
  
  /**
   * Дополнительный класс для отображения
   */
  extraClass?: string;
}

/**
 * Общие свойства для элемента UI
 */
export interface IGeneralElementProperties extends IGeneralBaseElementProperties, IGeneralBackgroundProperties,
  IGeneralBorderProperties, IGeneralTextProperties
{
}