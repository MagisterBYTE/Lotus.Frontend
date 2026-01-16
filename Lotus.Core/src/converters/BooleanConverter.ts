export abstract class BooleanConverter
{
  /**
   * Текстовые значение логического типа которые означает истинное значение
   */
  public static readonly TrueValues: readonly string[] =
    [
      'True',
      'true',
      '1',
      'on',
      'On',
      'истина',
      'Истина',
      'да',
      'Да'
    ] as const;

  /**
   * Преобразование объекта в логическое значение.
   * @param item Объект.
   * @param defaultValue Значение по умолчанию если преобразовать не удалось.
   * @returns Логическое значение.
   */
  public static toBoolean(item: unknown, defaultValue: boolean = false): boolean
  {
    if (item)
    {
      if (typeof item == 'boolean')
      {
        return item;
      }
      if (typeof item == 'string')
      {
        return BooleanConverter.TrueValues.indexOf(item) > -1;
      }
      if (typeof item == 'number')
      {
        return Boolean(item);
      }
    }
    return defaultValue;
  }

  /**
   * Преобразование текста в логическое значение.
   * @param value Текст.
   * @returns Логическое значение.
   */
  public static parse(value: string): boolean
  {
    return BooleanConverter.TrueValues.indexOf(value) > -1;
  }
}
