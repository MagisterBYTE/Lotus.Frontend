export abstract class EnumConverter
{
  /**
   * Метод для получения всех значений перечисления.
   * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
   * @returns массив всех значений перечисления.
   */
  public static getValues<TEnum>(enumValue: Record<string, TEnum>): TEnum[] 
  {
    return Object.keys(enumValue).map((key) => enumValue[key]).filter(x => typeof x == 'number'); // Используем !, чтобы указать TypeScript, что значение не null и не undefined.
  }

  /**
   * Метод для получения всех имен перечисления.
   * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
   * @returns массив всех имен перечисления.
   */
  public static getNames<TEnum>(enumValue: Record<string, TEnum>): string[] 
  {
    return Object.keys(enumValue).map((key) => key).filter(x => Number.isNaN(parseInt(x))); // Получаем ключи объекта, что соответствует именам перечисления.
  }
}