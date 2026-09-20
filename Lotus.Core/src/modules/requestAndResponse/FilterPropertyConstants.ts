import { FilterFunctionDescriptors } from '#modules/filter';
import { TPropertyTypes } from '#modules/objectInfo';
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
    propertyType: TPropertyTypes.Bool
  } as const;
}
