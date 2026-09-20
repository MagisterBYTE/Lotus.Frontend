/* oxlint-disable typescript/no-explicit-any */
import { BooleanConverter, DateTimeConverter } from "#converters";
import { BooleanHelper, DateTimeHelper, NumberHelper, StringHelper } from "#helpers";
import { TPropertyType, TPropertyTypes } from "#modules/objectInfo";
import { ISortProperty, ISortPropertyCollection } from "./SortProperty";

export abstract class SortPropertyHelper
{
  /**
   * Сортировка массива по указанному свойству сортировки
   * @param massive Исходный массив
   * @param sortProperty Параметры сортировки свойства
   * @returns Отсортированный массив
   */
  public static sortArrayByProperty<TItem = object>(massive: TItem[], sortProperty: ISortProperty): TItem[]
  {
    const propertyType: TPropertyType = sortProperty.propertyType!;
    const result: TItem[] = [...massive];
    const key = StringHelper.lowercaseFirstLetter(sortProperty.propertyPath);

    switch (propertyType)
    {
      case TPropertyTypes.Bool:
        {
          return result.sort((a, b) =>
          {
            const l: boolean = BooleanConverter.toBoolean((a as any)[key]);
            const r: boolean = BooleanConverter.toBoolean((b as any)[key]);
            return BooleanHelper.compare(l, r, sortProperty.isDesc);
          });
        }
        // break;
      case TPropertyTypes.Int:
      case TPropertyTypes.Long:
      case TPropertyTypes.Float:
      case TPropertyTypes.Double:
        {
          return result.sort((a, b) =>
          {
            const l: number = Number((a as any)[key]);
            const r: number = Number((b as any)[key]);
            return NumberHelper.compare(l, r, sortProperty.isDesc);
          });
        }
        // break;
      case TPropertyTypes.String:
      case TPropertyTypes.Guid:
        {
          return result.sort((a, b) =>
          {
            const l: string = String((a as any)[key]);
            const r: string = String((b as any)[key]);
            const status = l.localeCompare(r);
            if (sortProperty.isDesc)
            {
              if (status > 0) return -1;
              if (status < 0) return 1;
            }
            return status;
          });
        }
        //break;
      case TPropertyTypes.DateTime:
        {
          return result.sort((a, b) =>
          {
            const l: Date = DateTimeConverter.toDateTime((a as any)[key]);
            const r: Date = DateTimeConverter.toDateTime((b as any)[key]);
            return DateTimeHelper.compare(l, r, sortProperty.isDesc);
          });
        }
        // break;
      case TPropertyTypes.Object:
        {
          return result.sort((a, b) =>
          {
            const l: any = (a as any)[key];
            const r: any = (b as any)[key];
            return l.localeCompare(r);
          });
        }
        //break;
    }

    return massive;
  }

  /**
   * Сортировка массива по указанному массиву свойств сортировки
   * @param massive Исходный массив
   * @param sortProperties Массив свойств сортировки
   * @returns Отсортированный массив
   */
  public static sortArrayByProperties<TItem = object>(massive: TItem[], sortProperties?: ISortPropertyCollection): TItem[]
  {
    if (!sortProperties) return massive;

    let result: TItem[] = [...massive];

    for (const sortProperty of sortProperties)
    {
      result = SortPropertyHelper.sortArrayByProperty(result, sortProperty);
    }

    return result;
  }
}
