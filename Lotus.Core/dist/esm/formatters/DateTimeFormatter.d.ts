export declare class DateTimeFormatter {
    /**
     * Форматирует дату в строку с учетом указанной локали.
     * @param {Date} date - Объект Date, который нужно отформатировать.
     * @param {string} [locale='ru-RU'] - Локаль для форматирования (например, 'ru-RU', 'en-US').
     * @param {DateTimeFormatOptions} options - Дополнительные опции форматирование даты
     * @returns {string} - Отформатированная строка с датой.
     */
    date(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Форматирует дату и время в строку с учетом указанной локали.
     * @param {Date} date - Объект Date, который нужно отформатировать.
     * @param {string} [locale='ru-RU'] - Локаль для форматирования (например, 'ru-RU', 'en-US').
     * @param {DateTimeFormatOptions} options - Дополнительные опции форматирование даты
     * @returns {string} - Отформатированная строка с датой и временем.
     */
    dateTime(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Форматирует время в строку с учетом указанной локали.
     * @param {Date} date - Объект Date, который нужно отформатировать.
     * @param {string} [locale='ru-RU'] - Локаль для форматирования (например, 'ru-RU', 'en-US').
     * @param {DateTimeFormatOptions} options - Дополнительные опции форматирование даты
     * @returns {string} - Отформатированная строка с временем.
     */
    time(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
}
//# sourceMappingURL=DateTimeFormatter.d.ts.map