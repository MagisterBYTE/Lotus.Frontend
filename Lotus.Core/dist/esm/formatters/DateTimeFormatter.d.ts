/**
 * Вспомогательный класс для форматирования дат и времени с использованием Intl API
 * Поддерживает локализацию и интернационализацию
 */
export declare abstract class DateTimeFormatter {
    /**
     * Определяет, поддерживает ли браузер Intl.DateTimeFormat
     *
     * @returns {boolean} true если API поддерживается
     */
    static isDateTimeFormatSupported(): boolean;
    /**
     * Форматирует дату в строку с учетом указанной локали
     *
     * @param {Date} date - Дата для форматирования
     * @param {string} [locale='navigator.language'] - Локаль для форматирования (например: 'ru-RU', 'en-US', 'de-DE')
     * @param {Intl.DateTimeFormatOptions} [options] - Опции форматирования даты
     * @returns {string} Отформатированная строка с датой
     *
     * @example
     * ```typescript
     * DateTimeFormatter.date(new Date()); // "15.12.2024" (для ru-RU)
     * DateTimeFormatter.date(new Date(), 'en-US'); // "12/15/2024"
     * DateTimeFormatter.date(new Date(), 'ru-RU', { weekday: 'long' }); // "воскресенье, 15 декабря 2024 г."
     * ```
     */
    static date(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Форматирует дату и время в строку с учетом указанной локали
     *
     * @param {Date} date - Дата и время для форматирования
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.DateTimeFormatOptions} [options] - Опции форматирования даты и времени
     * @returns {string} Отформатированная строка с датой и временем
     *
     * @example
     * ```typescript
     * DateTimeFormatter.dateTime(new Date()); // "15.12.2024, 14:30:00" (для ru-RU)
     * DateTimeFormatter.dateTime(new Date(), 'en-US'); // "12/15/2024, 2:30:00 PM"
     * ```
     */
    static dateTime(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Форматирует только время в строку с учетом указанной локали
     *
     * @param {Date} date - Дата для извлечения времени
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.DateTimeFormatOptions} [options] - Опции форматирования времени
     * @returns {string} Отформатированная строка с временем
     *
     * @example
     * ```typescript
     * DateTimeFormatter.time(new Date()); // "14:30:00" (для ru-RU)
     * DateTimeFormatter.time(new Date(), 'en-US'); // "2:30:00 PM"
     * DateTimeFormatter.time(new Date(), 'ru-RU', { hour: '2-digit', minute: '2-digit' }); // "14:30"
     * ```
     */
    static time(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Проверяет, поддерживает ли браузер Intl.DurationFormat
     *
     * @private
     * @returns {boolean} true если API поддерживается
     */
    private static isDurationFormatSupported;
    /**
     * Форматирует продолжительность времени с использованием Intl.DurationFormat если доступно,
     * иначе использует fallback реализацию
     *
     * @param {DurationInput} duration - Объект с продолжительностью (годы, месяцы, недели, дни, часы, минуты, секунды, миллисекунды)
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования продолжительности
     * @returns {string} Отформатированная строка продолжительности
     *
     * @example
     * ```typescript
     * // Использование Intl.DurationFormat
     * DateTimeFormatter.formatDurationObject({ hours: 2, minutes: 30, seconds: 45 });
     * // "2 часа 30 минут 45 секунд" (для ru-RU)
     *
     * // Digital формат
     * DateTimeFormatter.formatDurationObject({ hours: 2, minutes: 5 }, 'en-US', { style: 'digital' });
     * // "2:05"
     *
     * // Короткий формат
     * DateTimeFormatter.formatDurationObject({ days: 1, hours: 2 }, 'en-US', { style: 'short' });
     * // "1 day, 2 hr"
     * ```
     */
    static formatDurationObject(duration: Intl.DurationInput, locale?: string, options?: Intl.DurationFormatOptions): string;
    /**
     * Fallback реализация форматирования продолжительности из объекта
     *
     * @private
     * @param {DurationInput} duration - Объект с продолжительностью
     * @param {string} locale - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {string} Отформатированная строка продолжительности
     */
    private static formatDurationObjectFallback;
    /**
     * Рассчитывает максимальное количество единиц для отображения
     *
     * @private
     * @param {DurationInput} duration - Объект с продолжительностью
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {number} Максимальное количество единиц
     */
    private static calculateMaxUnits;
    /**
     * Форматирует продолжительность времени из секунд с использованием Intl.DurationFormat если доступно
     *
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования продолжительности
     * @returns {string} Отформатированная строка продолжительности
     *
     * @example
     * ```typescript
     * DateTimeFormatter.formatDurationWithIntl(3665); // "1 час 1 минута 5 секунд"
     * DateTimeFormatter.formatDurationWithIntl(3665, 'en-US', { style: 'digital' }); // "1:01:05"
     * ```
     */
    static formatDurationWithIntl(seconds: number, locale?: string, options?: Intl.DurationFormatOptions): string;
    /**
     * Конвертирует секунды в объект продолжительности
     *
     * @private
     * @param {number} seconds - Продолжительность в секундах
     * @returns {DurationInput} Объект продолжительности
     */
    private static secondsToDurationObject;
    /**
     * Форматирует продолжительность времени в цифровом формате (часы:минуты:секунды)
     *
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Object} [options] - Дополнительные опции
     * @param {boolean} [options.showMilliseconds=false] - Показывать миллисекунды
     * @param {boolean} [options.forceHours=false] - Всегда показывать часы (даже если 0)
     * @returns {string} Отформатированная строка в цифровом формате
     *
     * @example
     * ```typescript
     * DateTimeFormatter.formatDurationDigital(3665); // "01:01:05"
     * DateTimeFormatter.formatDurationDigital(65); // "01:05"
     * DateTimeFormatter.formatDurationDigital(3665.123, 'en-US', { showMilliseconds: true }); // "01:01:05.123"
     * ```
     */
    static formatDurationDigital(seconds: number, locale?: string, options?: {
        showMilliseconds?: boolean;
        forceHours?: boolean;
    }): string;
    /**
     * Форматирует продолжительность времени в удобном формате с использованием лучшего доступного API
     * Основной метод, который должен использоваться в приложении
     *
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Object} [options] - Дополнительные опции
     * @param {'auto' | 'long' | 'short' | 'narrow' | 'digital'} [options.style='auto'] - Стиль форматирования
     * @param {number} [options.maxUnits=2] - Максимальное количество единиц в результате
     * @param {Intl.RelativeTimeFormatUnit[]} [options.units] - Список единиц для использования
     * @returns {string} Отформатированная продолжительность времени
     *
     * @example
     * ```typescript
     * DateTimeFormatter.formatDuration(3665); // Автоматически выбирает лучший формат
     * DateTimeFormatter.formatDuration(3665, 'ru-RU', { style: 'digital' }); // "01:01:05"
     * ```
     */
    static formatDuration(seconds: number, locale?: string, options?: {
        style?: 'auto' | 'long' | 'short' | 'narrow' | 'digital';
        maxUnits?: number;
        units?: Intl.RelativeTimeFormatUnit[];
    }): string;
    /**
     * Разбивает отформатированную продолжительность на части
     * Полезно для произвольного отображения
     *
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {DurationFormatPart[]} Массив частей отформатированной продолжительности
     *
     * @example
     * ```typescript
     * const parts = DateTimeFormatter.formatDurationToParts(3665);
     * // [
     * //   { type: 'integer', value: '1', unit: 'hour' },
     * //   { type: 'literal', value: ' ' },
     * //   { type: 'integer', value: '1', unit: 'minute' },
     * //   { type: 'literal', value: ' ' },
     * //   { type: 'integer', value: '5', unit: 'second' }
     * // ]
     * ```
     */
    static formatDurationToParts(seconds: number, locale?: string, options?: Intl.DurationFormatOptions): Intl.DurationFormatPart[];
    /**
     * Fallback эмуляция formatDurationToParts
     *
     * @private
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} locale - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {DurationFormatPart[]} Массив частей
     */
    private static formatDurationToPartsFallback;
    /**
     * Пытается определить единицу измерения из токена
     *
     * @private
     * @param {string} token - Токен
     * @param {string} locale - Локаль
     * @returns {string | undefined} Единица измерения
     */
    private static guessUnitFromToken;
    /**
     * Определяет, поддерживает ли браузер Intl.RelativeTimeFormat
     * Полезно для graceful degradation
     *
     * @returns {boolean} true если API поддерживается
     */
    static isRelativeTimeFormatSupported(): boolean;
    /**
     * Форматирует относительное время (сколько времени прошло или осталось)
     * Использует Intl.RelativeTimeFormat API
     *
     * @param {number} value - Количество единиц времени (может быть отрицательным)
     * @param {Intl.RelativeTimeFormatUnit} unit - Единица времени ('year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second')
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.RelativeTimeFormatOptions} [options] - Опции форматирования относительного времени
     * @returns {string} Отформатированная строка относительного времени
     *
     * @example
     * ```typescript
     * DateTimeFormatter.relativeTime(2, 'hours'); // "через 2 часа" (для ru-RU)
     * DateTimeFormatter.relativeTime(-3, 'days'); // "3 дня назад"
     * DateTimeFormatter.relativeTime(1, 'week', 'en-US'); // "in 1 week"
     * DateTimeFormatter.relativeTime(5, 'minutes', 'ru-RU', { numeric: 'auto' }); // "через 5 минут"
     * ```
     */
    static formatRelativeValue(value: number, unit: Intl.RelativeTimeFormatUnit, locale?: string, options?: Intl.RelativeTimeFormatOptions): string;
    /**
     * Форматирует продолжительность относительного времени в удобном для чтения формате
     * Автоматически выбирает подходящие единицы измерения
     *
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Object} [options] - Дополнительные опции форматирования
     * @param {'long' | 'short' | 'narrow'} [options.style='long'] - Стиль форматирования
     * @param {number} [options.maxUnits=2] - Максимальное количество единиц в результате
     * @param {Intl.RelativeTimeFormatUnit[]} [options.units] - Список единиц для использования (приоритетный порядок)
     * @returns {string} Отформатированная продолжительность относительного времени
     *
     * @example
     * ```typescript
     * DateTimeFormatter.formatRelative(3665); // "1 час и 5 секунд" (для ru-RU)
     * DateTimeFormatter.formatRelative(86400, 'en-US'); // "1 day"
     * DateTimeFormatter.formatRelative(90061, 'ru-RU', { maxUnits: 3 }); // "1 день, 1 час и 1 секунда"
     * DateTimeFormatter.formatRelative(3600, 'en-US', { style: 'short' }); // "1 hr"
     * ```
     */
    static formatRelative(seconds: number, locale?: string, options?: {
        style?: 'long' | 'short' | 'narrow';
        maxUnits?: number;
        units?: Intl.RelativeTimeFormatUnit[];
    }): string;
    /**
     * Форматирует время до или после указанной даты
     * Автоматически выбирает подходящую единицу времени
     *
     * @param {Date} targetDate - Целевая дата для сравнения
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {Intl.RelativeTimeFormatOptions} [options] - Опции форматирования относительного времени
     * @returns {string} Отформатированная строка времени до/после события
     *
     * @example
     * ```typescript
     * // Если сейчас 15.12.2024 14:30
     * const tomorrow = new Date('2024-12-16T14:30:00');
     * DateTimeFormatter.formatRelativeOfDate(tomorrow); // "через 1 день" (для ru-RU)
     *
     * const yesterday = new Date('2024-12-14T14:30:00');
     * DateTimeFormatter.formatRelativeOfDate(yesterday); // "1 день назад"
     *
     * DateTimeFormatter.formatRelativeOfDate(new Date(), 'en-US'); // "now"
     * ```
     */
    static formatRelativeOfDate(targetDate: Date, locale?: string, options?: Intl.RelativeTimeFormatOptions): string;
    /**
     * Возвращает список названий дней недели для указанной локали
     *
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {'long' | 'short' | 'narrow'} [format='long'] - Формат названий дней
     * @returns {string[]} Массив названий дней недели, начиная с воскресенья
     *
     * @example
     * ```typescript
     * DateTimeFormatter.getWeekdays();
     * // ['воскресенье', 'понедельник', ...] (для ru-RU)
     *
     * DateTimeFormatter.getWeekdays('en-US', 'short');
     * // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
     * ```
     */
    static getWeekdays(locale?: string, format?: 'long' | 'short' | 'narrow'): string[];
    /**
     * Возвращает список названий месяцев для указанной локали
     *
     * @param {string} [locale='navigator.language'] - Локаль для форматирования
     * @param {'long' | 'short' | 'narrow'} [format='long'] - Формат названий месяцев
     * @returns {string[]} Массив названий месяцев, начиная с января
     *
     * @example
     * ```typescript
     * DateTimeFormatter.getMonths();
     * // ['январь', 'февраль', ...] (для ru-RU)
     *
     * DateTimeFormatter.getMonths('en-US', 'short');
     * // ['Jan', 'Feb', 'Mar', ...]
     * ```
     */
    static getMonths(locale?: string, format?: 'long' | 'short' | 'narrow'): string[];
    /**
     * Преобразует дату в локальную ISO строку с учетом временной зоны
     * В отличие от Date.toISOString(), сохраняет локальное время
     *
     * @param {Date} date - Дата для преобразования
     * @returns {string} Строка в формате ISO 8601 с локальным временем
     *
     * @example
     * ```typescript
     * // При часовом поясе UTC+3
     * DateTimeFormatter.toISOLocal(new Date('2024-12-15T14:30:00+03:00'));
     * // "2024-12-15T14:30:00.000"
     * ```
     */
    static toISOLocal(date: Date): string;
    /**
     * Получает доступные локали для форматирования дат
     *
     * @returns {string[]} Массив доступных локалей или пустой массив если не поддерживается
     */
    static getAvailableLocales(): string[];
}
//# sourceMappingURL=DateTimeFormatter.d.ts.map