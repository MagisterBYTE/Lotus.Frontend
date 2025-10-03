
export abstract class EnumHelper
{
  /**
   * Проверка на установленный флаг
   * @param value Значение
   * @param flag Проверяемый флаг
   * @returns Статус установки флага
   */
  public static isFlagSet(value?: number, flag?: number): boolean
  {
    if(value)
    {
      if(flag)
      {
        return (value & flag) != 0;
      }
    }

    return false;
  }

  /**
   * Установка флага
   * @param value Значение
   * @param flag Флаг
   * @returns Новое значение
   */
  public static setFlag(value: number, flags: number): number
  {
    value |= flags;
    return value;
  }

  /**
   * Очистка флага
   * @param value Значение
   * @param flags Флаг
   * @returns Новое значение
   */
  public static clearFlag(value: number, flags: number): number
  {
    value &= ~flags;
    return value;
  }
}
