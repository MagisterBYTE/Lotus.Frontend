export class BooleanConverter
{
  /**
   * Текстовые значение логического типа которые означает истинное значение
   */
  public static readonly TrueValues: string[] =
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
    ];

  /**
   * Преобразование объекта в логическое значение.
   * @param item Объект.
   * @param defaultValue Значение по умолчанию если преобразовать не удалось.
   * @returns Логическое значение.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toBoolean(item: any, defaultValue: boolean = false): boolean
  {
    if (item)
    {
      if (typeof item == 'boolean')
      {
        return item as boolean;
      }
      if (typeof item == 'string')
      {
        return BooleanConverter.TrueValues.indexOf(item as string) > -1;
      }
      if (typeof item == 'number')
      {
        return Boolean(item as number);
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
