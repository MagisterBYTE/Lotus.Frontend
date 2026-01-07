import { TSizeType } from '#types';
import { IGeneralBackgroundProperties } from './GeneralBackgroundProperties';
import { IGeneralContainerProperties } from './GeneralContainerProperties';
import { IGeneralTextProperties } from './GeneralTextProperties';

/**
 * Базовые свойства для элемента UI
 */
export interface IGeneralBaseElementProperties 
{
  /**
   * Размер элемента
   */
  size?: TSizeType;
  
  /**
   * Дополнительный класс для отображения
   */
  extraClass?: string;
}

/**
 * Общие свойства для элемента UI
 */
export interface IGeneralElementProperties extends IGeneralBaseElementProperties, IGeneralBackgroundProperties,
  IGeneralContainerProperties, IGeneralTextProperties
{
}