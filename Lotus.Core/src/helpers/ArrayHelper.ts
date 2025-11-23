import { IGrouping } from '#types';

export abstract class ArrayHelper
{
  /**
   * Получить числовой массив в указанном диапазоне
   * @param from Начальное значение
   * @param to Конечное значение
   * @returns Числовой массив
   */
  public static createNumberArrayFromTo(from: number, to: number): number[]
  {
    const result: number[] = [];

    for (let i: number = from; i <= to; i++)
    {
      result.push(i);
    }

    return result;
  }

  /**
   * Проверка массива что он является строго числовым
   * @param array Проверяемый массив
   * @returns Статус проверки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static checkIsNumbers(array: any[])
  {
    return array.every((element) =>
    {
      return typeof element === 'number';
    });
  }

  /**
   * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
   * @param array Исходный массив
   * @param checked Проверяемый массив
   * @returns Статус проверки
   */
  public static checkInArrayAny<TItem>(array: TItem[], checked: TItem[]): boolean
  {
    let find: boolean = false;

    for (const element of array)
    {
      find = checked.includes(element);
      if (find)
      {
        break;
      }
    }

    return find;
  }

  /**
   * Группировка массива по указанному ключу key
   * @param array Исходный массив
   * @param key Ключ по которому будет произведена группировка
   * @returns Массив групп
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static groupByKey<TItem extends Record<TKey, any>, TKey extends keyof TItem>(array: TItem[], key: TKey): IGrouping<TItem>[]
  {
    const result: IGrouping<TItem>[] = [];

    for (const item of array)
    {
      const value = item[key];
      const exist = result.find((x) => x.groupKey === value);
      if (exist)
      {
        exist.items.push(item);
      }
      else
      {
        const newUserGroup: IGrouping<TItem> = { groupKey: value, items: [item] };
        result.push(newUserGroup);
      }
    }

    return result;
  }

  /**
   * Получает массив уникальный по ключу key
   * @param array Массив
   * @param key Ключ уникальности
   * @returns Массив уникальный по ключу key
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getUniqueByKey<TItem extends Record<TKey, any>, TKey extends keyof TItem>(array: TItem[], key: TKey): TItem[]
  {
    const seen = new Set();
    return array.filter((item) =>
    {
      const value = item[key];
      if (seen.has(value))
      {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  /**
   * Проверка массива на наличие дубликатов
   *
   * @param array Массив
   * @param key Ключ по которому идет проверка
   * @returns Статус проверки
   */
  public static hasDuplicatedByKey<TItem>(array: TItem[], key: keyof TItem): boolean
  {
    const newArray = array.map((element: TItem) => element[key]);
    return new Set(newArray).size !== newArray.length;
  }

  /**
   * Удаляет элементы из массива по ключу и значению (или массиву значений)
   * @param array Исходный массив объектов
   * @param key Ключ, по которому производится поиск
   * @param value Значение или массив значений для удаления
   * @returns Новый массив без удаленных элементов
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static removeByKey<TItem extends Record<string, any>>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): TItem[]
  {
    const valuesToRemove = Array.isArray(value) ? value : [value];
    return array.filter((item) =>
    {
      const itemValue = item[key];
      return !valuesToRemove.includes(itemValue);
    });
  }

  /**
   * Удаляет элементы из массива по ключу и значению (или массиву значений), мутируя исходный массив
   * @param array Исходный массив объектов (будет мутирован)
   * @param key Ключ, по которому производится поиск
   * @param value Значение или массив значений для удаления
   * @returns Количество удаленных элементов
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static removeByKeyInPlace<TItem extends Record<string, any>>(array: TItem[], key: keyof TItem, value: TItem[keyof TItem] | TItem[keyof TItem][]): number
  {
    const valuesToRemove = Array.isArray(value) ? value : [value];
    let removedCount = 0;

    for (let i = array.length - 1; i >= 0; i--)
    {
      const itemValue = array[i][key];
      if (valuesToRemove.includes(itemValue))
      {
        array.splice(i, 1);
        removedCount++;
      }
    }

    return removedCount;
  }

  /**
   * Вставка данных в указанный массив
   * @param array Исходный массив (будет мутирован)
   * @param index Индекс вставки
   * @param direction Направление вставки
   * @param value Значение или массив значений для вставки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static insertArrayInPlace<TItem = any>(array: TItem[], index: number, direction: 'Lower'|'End'|'Upper', value: TItem | TItem[])
  {
    const elementsToInsert = Array.isArray(value) ? value : [value];
    if (index < 0)
    {
      if (Array.isArray(value))
      {
        array.push(...value);
      }
      else
      {
        array.push(value);
      }
      return;
    }

    // Корректируем индекс в зависимости от направления вставки
    let insertIndex = index;

    if (direction === 'Lower') 
    {
      // Вставка ниже указанного индекса (после элемента)
      insertIndex = index + 1;
    }
    else if (direction === 'End') 
    {
      // Вставка в конец массива
      insertIndex = array.length;
    }

    // Если direction === 'Upper', вставка происходит на место index (перед элементом)

    // Вставляем элементы
    array.splice(insertIndex, 0, ...elementsToInsert);
  }
}
