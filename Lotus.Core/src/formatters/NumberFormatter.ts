import { LocalizationCoreDispatcher, TLanguageType } from '#localization';

export abstract class NumberFormatter
{
  /**
   * Форматирует число в соответствии с форматом и текущей локалью.
   * @param number Число для форматирования.
   * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
   * @param options Опции форматирования (например, минимальное и максимальное количество знаков после запятой).
   * @returns Отформатированная строка.
   */
  public static number(number: number, locale: TLanguageType = LocalizationCoreDispatcher.currentLanguage, options: Intl.NumberFormatOptions = {}): string
  {
    const result = new Intl.NumberFormat(locale, options).format(number);
    return result;
  }

  /**
   * Форматирует число в соответствии с форматом '0,0[.][maximumFractionDigits]'.
   * @param number Число для форматирования.
   * @param maximumFractionDigits Максимальное количество знаков после запятой если есть дробная часть.
   * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
   * @returns Отформатированная строка.
   */
  public static numberFixed(number: number, maximumFractionDigits:number = 2, locale: TLanguageType = LocalizationCoreDispatcher.currentLanguage): string 
  {
    // Форматируем число с учетом локали (целая часть и разделитель тысяч)
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maximumFractionDigits
    });

    const parts = formatter.formatToParts(number);

    // Ищем символы разделения
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value; // Запятая (",") для ru-RU
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const groupSeparator = parts.find(part => part.type === 'group')?.value;     // Неразрывный пробел ("\u202F") для ru-RU

    // Разделяем целую и дробную части
    const [integerPart, fractionalPart] = formatter.format(number).split(decimalSeparator ?? '.');

    // Если дробная часть есть и она не нулевая, добавляем её
    if (fractionalPart && Number(fractionalPart) !== 0) 
    {
      const result =  `${integerPart}.${fractionalPart}`;
      return result;
    }

    // Если дробная часть отсутствует или равна нулю, возвращаем только целую часть
    return integerPart;
  }

  /**
   * Форматирует число как валюту.
   * @param amount Сумма для форматирования.
   * @param currency Код валюты (например, 'USD', 'EUR', 'RUB'). По умолчанию 'USD'.
   * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
   * @returns Отформатированная строка с валютой.
   */
  public static currency(amount: number, currency: string = 'USD', locale: TLanguageType = LocalizationCoreDispatcher.currentLanguage): string
  {
    const result = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);

    return result;
  }

  /**
   * Форматирует число как процент.
   * @param amount Число для форматирования.
   * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
   * @param options Опции форматирования (например, минимальное и максимальное количество знаков после запятой).
   * @returns Отформатированная строка с процентом.
   */
  public static percentage(amount: number, locale: TLanguageType = LocalizationCoreDispatcher.currentLanguage, options: Intl.NumberFormatOptions = {}): string
  {
    const result = new Intl.NumberFormat(locale, {
      style: 'percent',
      ...options
    }).format(amount);

    return result;
  }
}