import { BooleanConverter, DateTimeConverter } from '#converters';
import { StringHelper, ObjectHelper } from '#helpers';
import { TFilterFunction } from '#modules/filter';
import { TPropertyType } from '#modules/objectInfo';
import { IFilterPropertyCollection, IFilterProperty } from './FilterProperty';

export abstract class FilterPropertyHelper 
{
  /**
   * Проверка на значение фильтра свойства
   * @param filterProperty Параметры фильтрации свойства
   */
  public static hasValue(filterProperty: IFilterProperty): boolean 
  {
    if (!filterProperty.value && !filterProperty.values) return false;

    if (filterProperty.value && !filterProperty.values) 
    {
      if (filterProperty.value === '') 
      {
        return false;
      }
      return true;
    }

    if (!filterProperty.value && filterProperty.values) 
    {
      if (filterProperty.values.length === 0) 
      {
        return false;
      }
      return true;
    }

    return false;
  }

  /**
   * Проверка на значение фильтров свойств
   * @param filterProperty Список параметров фильтрации свойства
   */
  public static hasValues(filterProperties: IFilterPropertyCollection): boolean 
  {
    let findValue = false;
    filterProperties.forEach((x) => 
    {
      if (findValue === false) 
      {
        findValue = FilterPropertyHelper.hasValue(x);
      }
    });

    return findValue;
  }

  /**
   * Фильтрация массива по указанному фильтру свойства
   * @param massive Исходный массив
   * @param filterProperty Параметры фильтрации свойства
   * @returns Отфильтрованный массив
   */
  // eslint-disable-next-line complexity
  public static filterArrayByProperty<TItem = object>(massive: TItem[], filterProperty: IFilterProperty): TItem[] 
  {
    if (FilterPropertyHelper.hasValue(filterProperty)) 
    {
      const propertyType: TPropertyType = filterProperty.propertyTypeDesc.type;
      const filterFunction: TFilterFunction = filterProperty.function.type;
      const key = StringHelper.lowercaseFirstLetter(filterProperty.propertyPath);

      switch (propertyType) 
      {
        case 'Boolean':
          {
            switch (filterFunction) 
            {
              case 'equals':
                return massive.filter((x) => BooleanConverter.toBoolean(ObjectHelper.getValue(x, key)) === BooleanConverter.toBoolean(filterProperty.value));
              case 'notEqual':
                return massive.filter((x) => BooleanConverter.toBoolean(ObjectHelper.getValue(x, key)) !== BooleanConverter.toBoolean(filterProperty.value));
            }
          }
          break;
        case 'Integer':
        case 'Double':
          {
            switch (filterFunction) 
            {
              case 'equals':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) === Number(filterProperty.value));
              case 'notEqual':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) !== Number(filterProperty.value));
              case 'lessThan':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) < Number(filterProperty.value));
              case 'lessThanOrEqual':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) <= Number(filterProperty.value));
              case 'greaterThan':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) > Number(filterProperty.value));
              case 'greaterThanOrEqual':
                return massive.filter((x) => Number(ObjectHelper.getValue(x, key)) >= Number(filterProperty.value));
              case 'between':
                return massive.filter((x) => 
                {
                  const check = Number(ObjectHelper.getValue(x, key));
                  const left = Number(filterProperty.values![0]);
                  const right = Number(filterProperty.values![1]);
                  return check > left && check < right;
                });
            }
          }
          break;
        case 'String':
        case 'Guid':
          {
            switch (filterFunction) 
            {
              case 'equals':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)) === filterProperty.value);
              case 'notEqual':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)) !== filterProperty.value);
              case 'contains':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).includes(filterProperty.value!));
              case 'startsWith':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).startsWith(filterProperty.value!));
              case 'endsWith':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).endsWith(filterProperty.value!));
              case 'notEmpty':
                return massive.filter((x) => StringHelper.isNullOrEmpty(String(ObjectHelper.getValue(x, key))) === false);
              case 'lessThan':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).localeCompare(filterProperty.value!) < 0);
              case 'lessThanOrEqual':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).localeCompare(filterProperty.value!) <= 0);
              case 'greaterThan':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).localeCompare(filterProperty.value!) > 0);
              case 'greaterThanOrEqual':
                return massive.filter((x) => String(ObjectHelper.getValue(x, key)).localeCompare(filterProperty.value!) >= 0);
            }
          }
          break;
        case 'DateTime':
          {
            switch (filterFunction) 
            {
              case 'equals':
                return massive.filter(
                  (x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) === DateTimeConverter.toDateTime(filterProperty.value!)
                );
              case 'notEqual':
                return massive.filter(
                  (x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) !== DateTimeConverter.toDateTime(filterProperty.value!)
                );
              case 'lessThan':
                return massive.filter((x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) < DateTimeConverter.toDateTime(filterProperty.value!));
              case 'lessThanOrEqual':
                return massive.filter(
                  (x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) <= DateTimeConverter.toDateTime(filterProperty.value!)
                );
              case 'greaterThan':
                return massive.filter((x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) > DateTimeConverter.toDateTime(filterProperty.value!));
              case 'greaterThanOrEqual':
                return massive.filter(
                  (x) => DateTimeConverter.toDateTime(ObjectHelper.getValue(x, key)) >= DateTimeConverter.toDateTime(filterProperty.value!)
                );
            }
          }
          break;
      }
    }

    return massive;
  }

  /**
   * Фильтрация массива по указанному массиву фильтров свойств
   * @param massive Исходный массив
   * @param filterProperties Массив фильтров свойств
   * @returns Отфильтрованный массив
   */
  public static filterArrayByProperties<TItem = object>(massive: TItem[], filterProperties?: IFilterPropertyCollection): TItem[] 
  {
    if (!filterProperties) return massive;

    let result: TItem[] = [...massive];

    for (const filterProperty of filterProperties) 
    {
      result = FilterPropertyHelper.filterArrayByProperty(result, filterProperty);
    }

    return result;
  }
}
