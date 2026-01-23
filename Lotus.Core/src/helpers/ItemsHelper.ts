import { TKey } from '#types';

/**
 * Класс-помощник для работы с коллекциями объектов
 */
export abstract class ItemsHelper
{
  /**
   * Получить идентификатор объекта через ключ id
   * @param item Объект
   * @returns Значение ключа id
   */
  public static getValueById<TItem extends {id: TKey}>(item: TItem): TKey
  {
    return item.id;
  }

  /**
   * Получить идентификатор объекта через ключ value
   * @param item Объект
   * @returns Значение ключа value
   */
  public static getValueByValue<TItem extends {value: TKey}>(item: TItem): TKey
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
    if (typeof item === 'object' && item)
    {
      if ('id' in item)
      {
        return item.id as TKey;
      }
      else if ('value' in item)
      {
        return item.value as TKey;
      }
    }

    return item as TKey;
  }

  /**
   * Получить название объекта через ключ label или name
   * @param item Объект
   * @returns Значение ключа
   */
  public static getLabelOfItem<TItem>(item: TItem): string
  {
    if (!item) return '';

    if (typeof item === 'object' && item)
    {
      if ('label' in item)
      {
        return item.label as string;
      }
      else if ('name' in item)
      {
        return item.name as string;
      }
    }

    return item as string;
  }

  /**
   * Получить статус недоступности объекта через ключ disabled или isDisabled
   * @param item Объект
   * @returns Статус недоступности объекта или undefined
   */
  public static getDisabledOfItem<TItem>(item: TItem): boolean|undefined
  {
    if (typeof item === 'object' && item)
    {
      if ('disabled' in item)
      {
        return item.disabled as boolean|undefined;
      }
      else if ('isDisabled' in item)
      {
        return item.isDisabled as boolean|undefined;
      }
    }

    return undefined;
  }
}
