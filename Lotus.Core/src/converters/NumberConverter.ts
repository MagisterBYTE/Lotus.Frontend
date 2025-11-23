export abstract class NumberConverter
{
  // #region Integer
  /**
   * Преобразование в текст который можно сконвертировать в целый тип
   * @param text Текст
   * @returns Текст
   */
  public static parsableTextInt(text: string): string
  {
    let numberText: string = '';

    let addMinus = false;
    const max = 11;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i];

      if (c == '-' && (i != text.length - 1) && addMinus == false)
      {
        numberText += c;
        addMinus = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }

      if (numberText.length > max)
      {
        break;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в целое число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static parseInt(text: string, defaultValue: number = 0): number
  {
    text = NumberConverter.parsableTextInt(text);

    const resultValue = Number.parseInt(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }
  // #endregion

  // #region Float
  /**
   * Преобразование в текст который можно сконвертировать в вещественный тип
   * @param text Текст
   * @returns Текст
   */
  public static parsableTextFloat(text: string): string
  {
    let numberText = '';

    let addMinus = false;
    let addDot = false;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i];

      if (c == '-' && (i != text.length - 1) && addMinus == false)
      {
        numberText += c;
        addMinus = true;
        continue;
      }

      if ((c == ',' || c == '.') && (i != text.length - 1) && addDot == false)
      {
        numberText += '.';
        addDot = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в вещественное число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static parseFloat(text: string, defaultValue: number = 0): number
  {
    text = NumberConverter.parsableTextFloat(text);

    const resultValue = Number.parseFloat(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }
  // #endregion
}
