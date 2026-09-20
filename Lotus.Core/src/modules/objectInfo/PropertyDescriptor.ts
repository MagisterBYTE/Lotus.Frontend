import { IPropertyEditable } from './PropertyEditable';
import { IPropertyFiltering } from './PropertyFiltering';
import { IPropertyGrouping } from './PropertyGrouping';
import { IPropertyRendering } from './PropertyRendering';
import { IPropertySorting } from './PropertySorting';
import { TPropertyType } from './PropertyType';
import { IPropertyVisualSettings } from './PropertyVisualSettings';

/**
 * Интерфейс для описания свойства объекта
 */
export interface IPropertyDescriptor
{
  /**
   * Имя свойства
   */
  fieldName: string;

  /**
   * Имя свойства на бэке (если оно есть использует оно, а не fieldName)
   */
  fieldNameBackend?: string;

  /**
   * Наименования свойства
   */
  name: string;

  /**
   * Описание свойства (в виде подсказки)
   */
  desc?: string;

  /**
   * Описание типа свойства
   */
  propertyType: TPropertyType;

  /**
   * Типа свойства - массив
   */
  isArray?: boolean;

  /**
   * Статус типа свойства Nullable.
   */
  isNullable?: boolean;

  /**
   * Только для даты - рассматривать выбор даты как выбор дня
   */
  isDateAsDay?: boolean;

  /**
   * Набор возможных значений свойства
   */
  // oxlint-disable-next-line typescript/no-explicit-any
  possibleValues?: any[];

  /**
   * Статус поддержки сортировки по свойству
   */
  sorting?: IPropertySorting;

  /**
   * Статус поддержки фильтрации по свойству
   */
  filtering?: IPropertyFiltering;

  /**
   * Статус поддержки группировки по свойству
   */
  grouping?: IPropertyGrouping;

  /**
   * Статус поддержки редактирования свойства
   */
  editing?: IPropertyEditable;

  /**
   * Статус индивидуальной отрисовки свойства
   */
  rendering?: IPropertyRendering;

  /**
   * Статус наличия визуальных настроек свойства
   */
  visualSettings?: IPropertyVisualSettings

  /**
   * Отображение указанного свойства как изображения
   */
  viewImage?: boolean;
}