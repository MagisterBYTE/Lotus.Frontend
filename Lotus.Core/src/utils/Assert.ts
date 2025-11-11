export class Assert
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
  public static existValue<TValue>(value: TValue|any): value is TValue
  {
    const status = (value != undefined && value != null);
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
      if (Boolean(arg))
      {
        return false;
      }
    }

    return true;
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
