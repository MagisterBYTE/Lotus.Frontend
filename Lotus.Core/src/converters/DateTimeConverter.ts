
export class DateTimeConverter 
{
  /**
   * Преобразование объекта в значение даты-времени.
   * @param value Объект.
   * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
   * @returns Значение.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDateTime(value: any, defaultValue: Date = new Date(Date.now())): Date 
  {
    if (value == null) return defaultValue;
    if (typeof value === 'number') return this.fromTimestamp(value);
    if (typeof value === 'string') return this.parse(value, defaultValue);
    return defaultValue;
  }

  /**
   * Преобразование в текст, который можно сконвертировать в тип дата-время.
   * @param text Текст.
   * @param formatDate Формат даты-времени.
   * @returns Текст или null, если сконвертировать невозможно.
   */
  public static parsableText(text: string, formatDate: string): string | null 
  {
    if (!text) return null;

    const date = this.tryParseDate(text);
    if (date) return date.toLocaleString();

    if (!formatDate) return null;

    switch (formatDate) 
    {
      case '%s':
        return new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes(),
          this.parseSecond(text)
        ).toLocaleString();
      case '%m':
        return new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          this.parseMinute(text),
          0
        ).toLocaleString();
      case '%H':
        return new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          this.parseHour(text),
          0,
          0
        ).toLocaleString();
      case 'H:m:s':
        return new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          this.parseHour(text),
          0,
          0
        ).toLocaleString();
      default:
        return null;
    }
  }

  /**
   * Преобразование текста в объект дата-время.
   * @param text Текст.
   * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
   * @returns Значение.
   */
  public static parse(text: string, defaultValue: Date = new Date(0)): Date 
  {
    if (!text) return defaultValue;

    const date = this.tryParseDate(text);
    return date ? date : defaultValue;
  }

  /**
   * Преобразование текста в объект дата-время.
   * @param text Текст.
   * @param result Значение.
   * @returns Статус успешности преобразования.
   */
  public static tryParse(text: string, result: Date): boolean 
  {
    if (!text) 
    {
      result = new Date(0);
      return false;
    }

    const date = this.tryParseDate(text);
    if (date) 
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result = date;
      return true;
    }

    return false;
  }

  /**
   * Преобразование текста в час.
   * @param text Текст.
   * @returns Значение часа в пределах от 0 до 24.
   */
  public static parseHour(text: string): number 
  {
    const value = parseInt(text, 10);
    return Math.min(23, value);
  }

  /**
   * Преобразование текста в минуту.
   * @param text Текст.
   * @returns Значение минуты в пределах от 0 до 59.
   */
  public static parseMinute(text: string): number 
  {
    const value = parseInt(text, 10);
    return Math.min(59, value);
  }

  /**
   * Преобразование текста в секунду.
   * @param text Текст.
   * @returns Значение секунды в пределах от 0 до 59.
   */
  public static parseSecond(text: string): number 
  {
    const value = parseInt(text, 10);
    return Math.min(59, value);
  }

  /**
   * Получить значение даты-времени через временную метку.
   * @param value Временная метка.
   * @returns Значение даты-времени.
   */
  public static fromTimestamp(value: number): Date 
  {
    return new Date(value * 1000);
  }

  /**
   * Преобразовать значение даты-времени во временную метку.
   * @param value Значение даты-времени.
   * @returns Временная метка.
   */
  public static toTimestamp(value: Date): number 
  {
    return Math.floor(value.getTime() / 1000);
  }

  private static tryParseDate(text: string): Date | null 
  {
    let date = new Date(text);
    if (!isNaN(date.getTime())) return date;

    date = new Date(Date.parse(text));
    if (!isNaN(date.getTime())) return date;

    return null;
  }
}
