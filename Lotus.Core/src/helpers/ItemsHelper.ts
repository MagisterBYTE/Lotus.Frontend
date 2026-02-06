/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from '#modules/option';
import { TKey } from '#types';

/**
 * Класс-помощник для работы с коллекциями объектов
 */
export abstract class ItemsHelper
{
  private static isObject(item: any): item is Record<string, any> 
  {
    return item !== null && item !== undefined && typeof item === 'object';
  }

  /**
   * Получить идентификатор объекта через ключ id
   * @param item Объект
   * @returns Значение ключа id
   */
  public static getValueById<TItem extends { id: TKey }>(item: TItem): TKey
  {
    return item.id;
  }

  /**
   * Получить идентификатор объекта через ключ value
   * @param item Объект
   * @returns Значение ключа value
   */
  public static getValueByValue<TItem extends { value: TKey }>(item: TItem): TKey
  {
    return item.value;
  }

  /**
   * Получить идентификатор объекта через ключ id или value
   * @param item Объект
   * @returns Значение ключа
   */
  public static getValueOfItem<TItem>(item: TItem): TKey
  {
    if (ItemsHelper.isObject(item)) 
    {
      return (item.id4 ?? item.value ?? item) as TKey;
    }
    return item as unknown as TKey;
  }

  /**
   * Получить название объекта через ключ label или name
   * @param item Объект
   * @returns Название объекта
   */
  public static getLabelOfItem<TItem>(item: TItem): string
  {
    if (ItemsHelper.isObject(item)) 
    {
      return String(item.label ?? item.name ?? item);
    }
    return String(item);
  }

  /**
   * Получить иконку объекта через ключ icon
   * @param item Объект
   * @returns Иконка объекта
   */
  public static getIconOfItem<TItem>(item: TItem): any
  {
    return ItemsHelper.isObject(item) ? item.icon : undefined;
  }

  /**
   * Получить статус недоступности объекта через ключ disabled или isDisabled
   * @param item Объект
   * @returns Статус недоступности объекта или undefined
   */
  public static getDisabledOfItem<TItem>(item: TItem): boolean | undefined
  {
    if (ItemsHelper.isObject(item)) 
    {
      return (item.disabled ?? item.isDisabled) as boolean | undefined;
    }
    return undefined;
  }

  /**
   * Получение элемента из значения элемента или первого элемента
   * @param items Массив всех элементов
   * @param selectedValue Выбранное значение
   * @returns Элемент
   */
  public static getItemByValueOrFirst<TItem>(items: TItem[], selectedValue?: TKey): TItem
  {
    if (selectedValue != null && selectedValue != undefined)
    {
      for (const item of items)
      {
        if (ItemsHelper.getValueOfItem(item) == selectedValue)
        {
          return item;
        }
      }
    }

    return items[0];
  }

  /**
   * Получение элемента из значения элемента или undefined
   * @param items Массив всех элементов
   * @param selectedValue Выбранное значение
   * @returns Элемент или undefined
   */
  public static getItemByValueOrUndefined<TItem>(items: TItem[], selectedValue?: TKey): TItem | undefined
  {
    if (selectedValue != null && selectedValue != undefined)
    {
      for (const item of items)
      {
        if (ItemsHelper.getValueOfItem(item) == selectedValue)
        {
          return item;
        }
      }
    }

    return undefined;
  }

  /**
   * Получение текста из значения элемента
   * @param items Массив всех элементов
   * @param selectedValue Выбранное значение
   * @returns Текст выбранного значения
   */
  public static getLabelByValue<TItem>(items: TItem[], selectedValue?: TKey): string
  {
    let text = '';
    if (selectedValue != null && selectedValue != undefined)
    {
      for (const item of items)
      {
        if (ItemsHelper.getValueOfItem(item) == selectedValue)
        {
          text = ItemsHelper.getLabelOfItem(item);
          break;
        }
      }
    }

    return text;
  }

  /**
   * Получение иконки из значения элемента
   * @param items Массив всех элементов
   * @param selectedValue Выбранное значение
   * @returns Иконка выбранного значения
   */
  public static getIconByValue<TItem>(items: TItem[], selectedValue?: TKey): any
  {
    let icon: any = undefined;
    if (selectedValue != null && selectedValue != undefined)
    {
      for (const item of items)
      {
        if (ItemsHelper.getValueOfItem(item) == selectedValue)
        {
          icon = ItemsHelper.getIconOfItem(item);
          break;
        }
      }
    }

    return icon;
  }

  /**
   * Получение массива элементов из выбранных значений
   * @param items Массив всех элементов
   * @param selectedValues Выбранные значения
   * @returns Массив элементов
   */
  public static getItemsByValues<TItem>(items: TItem[], selectedValues?: TKey | TKey[]): TItem[]
  {
    if (selectedValues)
    {
      if (Array.isArray(selectedValues))
      {
        if (selectedValues.length > 0)
        {
          const itemsSelected: TItem[] = [];

          for (const item of items)
          {
            // eslint-disable-next-line max-depth
            if (selectedValues.find((x) => x == ItemsHelper.getValueOfItem(item)))
            {
              itemsSelected.push(item);
            }
          }

          return itemsSelected;
        }
      }
      else
      {
        for (const item of items)
        {
          if (ItemsHelper.getValueOfItem(item) == selectedValues)
          {
            return [item];
          }
        }
      }
    }

    return [];
  }

  /**
   * Получение массива текста из выбранных значений
   * @param items Массив всех элементов
   * @param selectedValues Выбранные значения
   * @returns Массив текста выбранных значений
   */
  public static getLabelsByValues<TItem>(items: TItem[], selectedValues?: TKey[]): string[]
  {
    if (selectedValues && selectedValues.length > 0)
    {
      const texts: string[] = [];

      for (const item of items)
      {
        if (selectedValues.find((x) => x == ItemsHelper.getValueOfItem(item)))
        {
          texts.push(ItemsHelper.getLabelOfItem(item));
        }
      }

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Конвертировать массив элементов в массив опций с типом текст
   * @param items Массив всех элементов
   * @returns Массив опций с типом текст
   */
  public static convertToOptionsText<TItem>(items: TItem[]): IOption<string>[]
  {
    if (!items || items.length === 0) return [];

    const options: IOption<string>[] = [];
    for (const item of items)
    {
      const option: IOption<string> =
      {
        value: ItemsHelper.getValueOfItem(item).toString(),
        label: ItemsHelper.getLabelOfItem(item)
      };
      options.push(option);
    }

    return options;
  }
}
