
export abstract class NumberHelper
{
  /**
   * Сравнение числовых значений
   * @param left Левое значение
   * @param right Правое значение
   * @param isDesc Статус сравнения по убыванию
   * @returns Статус сравнения
   */
  public static compare(left?: number, right?: number, isDesc?: boolean):number
  {
    let status:number = 0;
    if(left)
    {
      if(right)
      {
        status = Math.sign(left - right);
      }
      else
      {
        status = 1;
      }
    }
    else
    {
      if(right)
      {
        status = -1;
      }
      else
      {
        status = 0;
      }
    }

    if(isDesc)
    {
      if(status > 0) return -1;
      else
      {
        if(status < 0) return 1;
        else return 0;
      }
    }

    return status;
  }  

  /**
   * Проверка на установленный флаг
   * @param value Значение
   * @param flag Проверяемый флаг
   * @returns Статус установки флага
   */
  public static isFlagSet(value: number, flag: number): boolean
  {
    return (value & flag) != 0;
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
