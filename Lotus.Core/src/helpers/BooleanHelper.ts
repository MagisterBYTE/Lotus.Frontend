export abstract class BooleanHelper
{
  /**
   * Сравнение логических значений
   * @param left Левое значение
   * @param right Правое значение
   * @param isDesc Статус сравнения по убиванию
   * @returns Статус сравнения
   */
  public static compare(left?: boolean, right?: boolean, isDesc?: boolean):number
  {
    let status:number = 0;
    if (left)
    {
      if (right)
      {
        status = 0;
      }
      else
      {
        status = 1;
      }
    }
    else
    {
      if (right)
      {
        status = -1;
      }
      else
      {
        status = 0;
      }
    }

    if (isDesc)
    {
      if (status > 0) return -1;
      else
      {
        if (status < 0) return 1;
        else return 0;
      }
    }

    return status;
  }
}
