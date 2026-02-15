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
        case 'bool':
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
        case 'int':
        case 'long':
        case 'float':
        case 'double':
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
              case 'includeAny':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  // Если нет значений для фильтрации - пропускаем элемент
                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  // Если значение пустое - элемент не проходит фильтр для IncludeAny
                  if (value === null || value === undefined) 
                  {
                    return false;
                  }

                  // Для целого числа: проверяем содержит ли строка хотя бы одно из значений
                  if (typeof value === 'number') 
                  {
                    return filterProperty.values.some((filterValue) => value == Number(filterValue));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.some((filterValue) => String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем пересечение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    // Проверяем, есть ли хотя бы одно общее значение
                    return filterProperty.values.some((filterValue) =>
                      value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массива чисел: проверяем пересечение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') 
                  {
                    // Проверяем, есть ли хотя бы одно общее значение
                    return filterProperty.values.some((filterValue) =>
                      value.some((item) => item === Number(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.some((filterValue) => ids.some((id) => id.includes(filterValue)));
                  }

                  return false;
                });

              case 'includeAll':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    return false;
                  }

                  // Для строки: проверяем содержит ли строка ВСЕ значения
                  // Для целого числа: проверяем содержит ли строка хотя бы одно из значений
                  if (typeof value === 'number') 
                  {
                    return filterProperty.values.every((filterValue) => value == Number(filterValue));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.every((filterValue) => String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем что все значения фильтра присутствуют в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    return filterProperty.values.every((filterValue) =>
                      value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массива чисел: проверяем что все значения фильтра присутствуют в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') 
                  {
                    // Проверяем, есть ли хотя бы одно общее значение
                    return filterProperty.values.every((filterValue) =>
                      value.some((item) => item === Number(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.every((filterValue) => ids.some((id) => id.includes(filterValue)));
                  }

                  return false;
                });

              case 'includeEquals':
                // eslint-disable-next-line complexity
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  if (!filterProperty.values) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    // Для IncludeEquals пустое значение равно только пустому массиву фильтров
                    return filterProperty.values.length === 0;
                  }

                  // Для строки: сравниваем строки
                  if (typeof value === 'number') 
                  {
                    // Если одно значение - простое сравнение
                    if (filterProperty.values.length === 1) 
                    {
                      return value === Number(filterProperty.values[0]);
                    }
                    // Если несколько значений - массив должен содержать только эти значения
                    return false; // Строка не может быть равна массиву значений
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    // Если одно значение - простое сравнение
                    if (filterProperty.values.length === 1) 
                    {
                      return value.id === filterProperty.values[0];
                    }
                    // Если несколько значений - массив должен содержать только эти значения
                    return false; // Объект не может быть равна массиву значений
                  }

                  // Для массива: проверяем точное совпадение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    if (value.length !== filterProperty.values.length) 
                    {
                      return false;
                    }

                    // Сортируем и сравниваем
                    const sortedValue = [...value].sort();
                    const sortedFilter = [...filterProperty.values].sort();

                    return sortedValue.every((item, index) => String(item) === sortedFilter[index]);
                  }

                  // Для массива чисел: проверяем точное совпадение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') 
                  {
                    if (value.length !== filterProperty.values.length) 
                    {
                      return false;
                    }

                    // Сортируем и сравниваем
                    const sortedValue = [...value].sort();
                    const sortedFilter = [...filterProperty.values].sort();

                    return sortedValue.every((item, index) => Number(item) === Number(sortedFilter[index]));
                  }

                  // Для массива: проверяем точное совпадение массивов
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    if (value.length !== filterProperty.values.length) 
                    {
                      return false;
                    }

                    // Сортируем и сравниваем
                    const sortedValue = value.map((x) => x.id).sort();
                    const sortedFilter = [...filterProperty.values].sort();

                    return sortedValue.every((item, index) => String(item) === sortedFilter[index]);
                  }

                  return false;
                });

              case 'includeNone':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  // Если нет значений для фильтрации - все элементы проходят
                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    return true; // Пустое значение не содержит никаких значений
                  }

                  // Для строки: проверяем что строка НЕ содержит ни одного значения
                  if (typeof value === 'number') 
                  {
                    return filterProperty.values.every((filterValue) => !(value == Number(filterValue)));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.every((filterValue) => !String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем что ни одно значение фильтра не присутствует в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    return filterProperty.values.every(
                      (filterValue) => !value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массива чисел: проверяем что ни одно значение фильтра не присутствует в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') 
                  {
                    return filterProperty.values.every((filterValue) =>
                      !value.some((item) => item === Number(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.every((filterValue) => !ids.some((id) => id.includes(filterValue)));
                  }

                  return true;
                });
            }
          }
          break;
        case 'string':
        case 'guid':
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
              case 'includeAny':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  // Если нет значений для фильтрации - пропускаем элемент
                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  // Если значение пустое - элемент не проходит фильтр для IncludeAny
                  if (value === null || value === undefined) 
                  {
                    return false;
                  }

                  // Для строки: проверяем содержит ли строка хотя бы одно из значений
                  if (typeof value === 'string') 
                  {
                    return filterProperty.values.some((filterValue) => value.includes(filterValue));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.some((filterValue) => String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем пересечение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    // Проверяем, есть ли хотя бы одно общее значение
                    return filterProperty.values.some((filterValue) =>
                      value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массива чисел: проверяем пересечение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') 
                  {
                    // Проверяем, есть ли хотя бы одно общее значение
                    return filterProperty.values.some((filterValue) =>
                      value.some((item) => item === Number(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.some((filterValue) => ids.some((id) => id.includes(filterValue)));
                  }

                  return false;
                });

              case 'includeAll':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    return false;
                  }

                  // Для строки: проверяем содержит ли строка ВСЕ значения
                  if (typeof value === 'string') 
                  {
                    return filterProperty.values.every((filterValue) => value.includes(filterValue));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.every((filterValue) => String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем что все значения фильтра присутствуют в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    return filterProperty.values.every((filterValue) =>
                      value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.every((filterValue) => ids.some((id) => id.includes(filterValue)));
                  }

                  return false;
                });

              case 'includeEquals':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  if (!filterProperty.values) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    // Для IncludeEquals пустое значение равно только пустому массиву фильтров
                    return filterProperty.values.length === 0;
                  }

                  // Для строки: сравниваем строки
                  if (typeof value === 'string') 
                  {
                    // Если одно значение - простое сравнение
                    if (filterProperty.values.length === 1) 
                    {
                      return value === filterProperty.values[0];
                    }
                    // Если несколько значений - массив должен содержать только эти значения
                    return false; // Строка не может быть равна массиву значений
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    // Если одно значение - простое сравнение
                    if (filterProperty.values.length === 1) 
                    {
                      return value.id === filterProperty.values[0];
                    }
                    // Если несколько значений - массив должен содержать только эти значения
                    return false; // Объект не может быть равна массиву значений
                  }

                  // Для массива: проверяем точное совпадение массивов
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    if (value.length !== filterProperty.values.length) 
                    {
                      return false;
                    }

                    // Сортируем и сравниваем
                    const sortedValue = [...value].sort();
                    const sortedFilter = [...filterProperty.values].sort();

                    return sortedValue.every((item, index) => String(item) === sortedFilter[index]);
                  }

                  // Для массива: проверяем точное совпадение массивов
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    if (value.length !== filterProperty.values.length) 
                    {
                      return false;
                    }

                    // Сортируем и сравниваем
                    const sortedValue = value.map((x) => x.id).sort();
                    const sortedFilter = [...filterProperty.values].sort();

                    return sortedValue.every((item, index) => String(item) === sortedFilter[index]);
                  }

                  return false;
                });

              case 'includeNone':
                return massive.filter((x) => 
                {
                  const value = ObjectHelper.getValue(x, key);

                  // Если нет значений для фильтрации - все элементы проходят
                  if (!filterProperty.values || filterProperty.values.length === 0) 
                  {
                    return true;
                  }

                  if (value === null || value === undefined) 
                  {
                    return true; // Пустое значение не содержит никаких значений
                  }

                  // Для строки: проверяем что строка НЕ содержит ни одного значения
                  if (typeof value === 'string') 
                  {
                    return filterProperty.values.every((filterValue) => !value.includes(filterValue));
                  }

                  // Для объектов с id
                  if (typeof value === 'object' && value !== null && 'id' in value) 
                  {
                    return filterProperty.values.every((filterValue) => !String(value.id).includes(filterValue));
                  }

                  // Для массива строк: проверяем что ни одно значение фильтра не присутствует в массиве
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') 
                  {
                    return filterProperty.values.every(
                      (filterValue) => !value.some((item) => typeof item === 'string' && item.includes(filterValue))
                    );
                  }

                  // Для массивов объектов с id
                  if (
                    Array.isArray(value) &&
                    value.length > 0 &&
                    typeof value[0] === 'object' &&
                    value[0] !== null &&
                    'id' in value[0]
                  ) 
                  {
                    const ids = value.map((item) => String(item.id));
                    return filterProperty.values.every((filterValue) => !ids.some((id) => id.includes(filterValue)));
                  }

                  return true;
                });
            }
          }
          break;
        case 'dateTime':
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
