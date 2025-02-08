
export class DateTimeHelper
{
  /**
   * Сравнение значений дат
   * @param left Левое значение
   * @param right Правое значение
   * @param isDesc Статус сравнения по убыванию
   * @returns Статус сравнения
   */
  public static compare(left?: Date, right?: Date, isDesc?: boolean):number
  {
    let status:number = 0;
    if(left)
    {
      if(right)
      {
        if(left > right)
        {
          status = 1;
        }
        else
        {
          if(left < right)
          {
            status = -1;
          }
          else
          {
            status = 0;
          }
        }
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
}
