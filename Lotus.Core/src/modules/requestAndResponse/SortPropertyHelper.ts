/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTimeConverter } from '../../converters';
import { StringHelper, BooleanHelper, NumberHelper, DateTimeHelper } from '../../helpers';
import { TPropertyType } from '../objectInfo';
import { ISortObject, ISortProperty } from './SortProperty';

export class SortPropertyHelper
{
  /**
   * Сортировка массива по указанному свойству сортировки
   * @param massive Исходный массив
   * @param sortProperty Параметры сортировки свойства
   * @returns Отсортированный массив
   */
  public static sortArrayByProperty<TItem = object>(massive: TItem[], sortProperty: ISortProperty): TItem[]
  {
    const propertyType: TPropertyType = sortProperty.propertyTypeDesc!.type;
    const result: TItem[] = [...massive];
    const key = StringHelper.lowercaseFirstLetter(sortProperty.propertyPath);

    switch (propertyType)
    {
      case 'Boolean':
        {
          return result.sort((a, b) =>
          {
            const l: boolean = BooleanHelper.parse((a as any)[key]);
            const r: boolean = BooleanHelper.parse((b as any)[key]);
            return BooleanHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
      case 'Integer':
      case 'Double':
        {
          return result.sort((a, b) =>
          {
            const l: number = Number((a as any)[key]);
            const r: number = Number((b as any)[key]);
            return NumberHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
      case 'String':
      case 'Guid':
        {
          return result.sort((a, b) =>
          {
            const l: string = String((a as any)[key]);
            const r: string = String((b as any)[key]);
            const status =  l.localeCompare(r);
            if(sortProperty.isDesc)
            {
              if(status > 0) return -1;
              if(status < 0) return 1;
            }
            return status
          });
        } break;
      case 'DateTime':
        {
          return result.sort((a, b) =>
          {
            const l: Date = DateTimeConverter.convert((a as any)[key]);
            const r: Date = DateTimeConverter.convert((b as any)[key]);
            return DateTimeHelper.compare(l, r, sortProperty.isDesc);
          });
        } break;
    }

    return massive;
  }

  /**
   * Сортировка массива по указанному массиву свойств сортировки
   * @param massive Исходный массив
   * @param sortProperties Массив свойств сортировки
   * @returns Отсортированный массив
   */
  public static sortArrayByProperties<TItem = object>(massive: TItem[], sortProperties?: ISortObject): TItem[]
  {
    if(!sortProperties) return massive;

    let result: TItem[] = [...massive];

    for (const sortProperty of sortProperties) 
    {
      result = SortPropertyHelper.sortArrayByProperty(result, sortProperty);
    }

    return result;
  }
}