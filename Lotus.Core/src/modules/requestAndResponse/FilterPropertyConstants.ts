import { FilterFunctionDescriptors } from '#modules/filter';
import { PropertyTypeDescriptors } from '#modules/objectInfo';
import { IFilterProperty } from './FilterProperty';

/**
 * Константы для фильтрации
 */
export abstract class FilterPropertyConstants 
{
  /**
   * Пустой фильтр
   */
  public static readonly Empty: IFilterProperty = {
    function: FilterFunctionDescriptors.Equals,
    propertyPath: '',
    propertyTypeDesc: PropertyTypeDescriptors.Bool
  } as const;
}
