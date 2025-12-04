/* eslint-disable @typescript-eslint/no-explicit-any */
import { TKey } from '#types';

/**
 * Класс для проверки утверждений и валидации данных
 * Содержит статические методы для проверки типов и условий
 */
export abstract class Assert
{
  /**
   * Проверка значения на undefined или null
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static emptyValue(value: unknown): boolean
  {
    return value == undefined || value == null || (typeof value === 'string' && value == '');
  }

  /**
   * Проверка на наличие значения
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static existValue<TValue>(value: TValue | any): value is TValue
  {
    const status = value != undefined && value != null;
    if (status)
    {
      if (typeof value === 'string')
      {
        if (value === '') return false;
      }
      return true;
    }

    return false;
  }

  /**
   * Метод возвращает true если хотя бы один из аргументов при преобразовании в Boolean дает true
   * @param args Список аргументов
   * @returns
   */
  public static anyTrue(...args: any[]): boolean
  {
    for (const arg of args)
    {
      // eslint-disable-next-line no-extra-boolean-cast
      if (Boolean(arg))
      {
        return true;
      }
    }
    return false;
  }

  /**
   * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
   * @param args Список аргументов
   * @returns
   */
  public static allTrue(...args: any[]): boolean
  {
    // Перебираем все аргументы с помощью цикла for...of
    for (const arg of args)
    {
      // Если хотя бы один аргумент преобразуется в false,
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(arg))
      {
        // немедленно возвращаем false (короткое замыкание)
        return false;
        // ↑
        // Не проверяем остальные аргументы, так как уже нашли false
      }
    }
    // Если ВСЕ аргументы преобразовались в true, возвращаем true
    // Также возвращает true для пустого списка аргументов
    return true;
  }

  /**
   * Метод возвращает false если хотя бы один из аргументов при преобразовании в Boolean дает false
   * @param args Список аргументов
   * @returns
   */
  public static anyFalse(...args: any[]): boolean
  {
    for (const arg of args)
    {
      if (Boolean(arg) === false)
      {
        return true;
      }
    }
    return false;
  }

  /**
   * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
   * @param args Список аргументов
   * @returns
   */
  public static allFalse(...args: any[]): boolean
  {
    for (const arg of args)
    {
      // eslint-disable-next-line no-extra-boolean-cast
      if (Boolean(arg))
      {
        return false;
      }
    }

    return true;
  }

  /**
   * Проверяет, является ли значение строкой
   * @param value - Проверяемое значение
   * @returns true, если значение является строкой, иначе false
   */
  static isString(value: unknown): value is string
  {
    return typeof value === 'string';
  }

  /**
   * Проверяет, является ли значение числом
   * @param value - Проверяемое значение
   * @returns true, если значение является числом, иначе false
   */
  static isNumber(value: unknown): value is number
  {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Проверяет, является ли значение булевым типом
   * @param value - Проверяемое значение
   * @returns true, если значение является boolean, иначе false
   */
  static isBoolean(value: unknown): value is boolean
  {
    return typeof value === 'boolean';
  }

  /**
   * Проверяет, является ли значение объектом (но не null и не массивом)
   * @param value - Проверяемое значение
   * @returns true, если значение является объектом, иначе false
   */
  static isObject(value: unknown): value is Record<string, unknown>
  {
    return typeof value === 'object' && value !== null && value !== undefined && !Array.isArray(value);
  }

  /**
   * Проверяет, является ли значение объектом { id: TKey }
   * @param value - Проверяемое значение
   * @returns true, если значение является объектом, иначе false
   */
  static isObjectOfId(value: unknown): value is { id: TKey }
  {
    return typeof value === 'object' && value !== null && value !== undefined &&  'id' in value;
  }

  /**
   * Проверяет, является ли значение null
   * @param value - Проверяемое значение
   * @returns true, если значение является null, иначе false
   */
  static isNull(value: unknown): value is null
  {
    return value === null;
  }

  /**
   * Проверяет, является ли значение undefined
   * @param value - Проверяемое значение
   * @returns true, если значение является undefined, иначе false
   */
  static isUndefined(value: unknown): value is undefined
  {
    return value === undefined;
  }

  /**
   * Проверяет, является ли значение функцией
   * @param value - Проверяемое значение
   * @returns true, если значение является функцией, иначе false
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  static isFunction(value: unknown): value is Function
  {
    return typeof value === 'function';
  }

  /**
   * Проверяет, является ли значение символом
   * @param value - Проверяемое значение
   * @returns true, если значение является символом, иначе false
   */
  static isSymbol(value: unknown): value is symbol
  {
    return typeof value === 'symbol';
  }

  /**
   * Проверяет, является ли значение массивом
   * @param value - Проверяемое значение
   * @returns true, если значение является массивом, иначе false
   */
  static isArray(value: unknown): value is unknown[]
  {
    return Array.isArray(value);
  }

  /**
   * Проверяет, является ли значение массивом и содержит ли он хотя бы один элемент
   * @param value - Проверяемое значение
   * @returns true, если значение является непустым массивом, иначе false
   */
  static isArrayWithData<T>(value: unknown): value is T[]
  {
    return Array.isArray(value) && value.length > 0;
  }

  /**
   * Проверяет, является ли значение массивом строк
   * @param value - Проверяемое значение
   * @returns true, если значение является массивом строк и содержит данные, иначе false
   */
  static isArrayStringWithData(value: unknown): value is string[]
  {
    return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string');
  }

  /**
   * Проверяет, является ли значение массивом чисел
   * @param value - Проверяемое значение
   * @returns true, если значение является массивом чисел и содержит данные, иначе false
   */
  static isArrayNumberWithData(value: unknown): value is number[]
  {
    return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'number' && !isNaN(item));
  }

  /**
   * Проверяет, является ли значение массивом объектов
   * @param value - Проверяемое значение
   * @returns true, если значение является массивом объектов и содержит данные, иначе false
   */
  static isArrayObjectWithData(value: unknown): value is Record<string, unknown>[]
  {
    return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
  }

  /**
   * Проверяет, является ли значение массивом объектов
   * @param value - Проверяемое значение
   * @returns true, если значение является массивом объектов и содержит данные, иначе false
   */
  static isArrayObjectOfIdWithData(value: unknown): value is { id: TKey }[]
  {
    return Array.isArray(value) && value.length > 0 &&  Assert.isObjectOfId(value[0]);
  }

  /**
   * Универсальный метод для проверки массива с кастомной проверкой элементов
   * @param value - Проверяемое значение
   * @param itemValidator - Функция для проверки каждого элемента массива
   * @returns true, если значение является массивом с данными и все элементы проходят валидацию
   */
  static isArrayOfTypeWithData<TItem>(value: unknown, itemValidator: (item: unknown) => item is TItem): value is TItem[]
  {
    return Array.isArray(value) && value.length > 0 && value.every((item) => itemValidator(item));
  }

  /**
   * Проверка объекта на то, что все его свойства имеют значения undefined
   * @param object Проверяемый объект
   * @returns Статус проверки
   */
  public static objectPropertyEmpty(object: object): boolean
  {
    return !Object.values(object).some((value) => value !== undefined);
  }
}
