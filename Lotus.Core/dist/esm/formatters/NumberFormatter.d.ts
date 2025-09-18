import { TLanguageType } from '../localization';
export declare class NumberFormatter {
    /**
     * Форматирует число в соответствии с форматом и текущей локалью.
     * @param number Число для форматирования.
     * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
     * @param options Опции форматирования (например, минимальное и максимальное количество знаков после запятой).
     * @returns Отформатированная строка.
     */
    static number(number: number, locale?: TLanguageType, options?: Intl.NumberFormatOptions): string;
    /**
     * Форматирует число в соответствии с форматом '0,0[.][maximumFractionDigits]'.
     * @param number Число для форматирования.
     * @param maximumFractionDigits Максимальное количество знаков после запятой если есть дробная часть.
     * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
     * @returns Отформатированная строка.
     */
    static numberFixed(number: number, maximumFractionDigits?: number, locale?: TLanguageType): string;
    /**
     * Форматирует число как валюту.
     * @param amount Сумма для форматирования.
     * @param currency Код валюты (например, 'USD', 'EUR', 'RUB'). По умолчанию 'USD'.
     * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
     * @returns Отформатированная строка с валютой.
     */
    static currency(amount: number, currency?: string, locale?: TLanguageType): string;
    /**
     * Форматирует число как процент.
     * @param amount Число для форматирования.
     * @param locale Локаль (например, 'ru-RU', 'en-US'). По умолчанию используется локаль браузера.
     * @param options Опции форматирования (например, минимальное и максимальное количество знаков после запятой).
     * @returns Отформатированная строка с процентом.
     */
    static percentage(amount: number, locale?: TLanguageType, options?: Intl.NumberFormatOptions): string;
}
//# sourceMappingURL=NumberFormatter.d.ts.map