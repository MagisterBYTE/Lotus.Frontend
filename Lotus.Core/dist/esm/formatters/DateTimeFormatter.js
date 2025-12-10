/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from '#utils';
/**
 * Вспомогательный класс для форматирования дат и времени с использованием Intl API
 * Поддерживает локализацию и интернационализацию
 */
export class DateTimeFormatter {
    // #region Format DateTime
    /**
     * Определяет, поддерживает ли браузер Intl.DateTimeFormat
     *
     * @returns {boolean} true если API поддерживается
     */
    static isDateTimeFormatSupported() {
        return typeof Intl !== 'undefined' && 'DateTimeFormat' in Intl;
    }
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
    static date(date, locale = navigator.language, options) {
        return date.toLocaleDateString(locale, options);
    }
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
    static dateTime(date, locale = navigator.language, options) {
        return date.toLocaleString(locale, options);
    }
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
    static time(date, locale = navigator.language, options) {
        return date.toLocaleTimeString(locale, options);
    }
    // #endregion
    // #region Format Duration
    /**
     * Проверяет, поддерживает ли браузер Intl.DurationFormat
     *
     * @private
     * @returns {boolean} true если API поддерживается
     */
    static isDurationFormatSupported() {
        return typeof Intl !== 'undefined' && 'DurationFormat' in Intl;
    }
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
    static formatDurationObject(duration, locale = navigator.language, options) {
        // Проверяем поддержку Intl.DurationFormat
        if (this.isDurationFormatSupported()) {
            try {
                const defaultOptions = {
                    style: 'long',
                    yearsDisplay: 'auto',
                    monthsDisplay: 'auto',
                    weeksDisplay: 'auto',
                    daysDisplay: 'auto',
                    hoursDisplay: 'auto',
                    minutesDisplay: 'auto',
                    secondsDisplay: 'auto',
                    millisecondsDisplay: 'auto'
                };
                const formatter = new Intl.DurationFormat(locale, {
                    ...defaultOptions,
                    ...options
                });
                return formatter.format(duration);
            }
            catch (error) {
                console.warn('Intl.DurationFormat error, using fallback:', error);
                // Fallback на нашу реализацию
                return this.formatDurationObjectFallback(duration, locale, options);
            }
        }
        // Используем fallback реализацию
        return this.formatDurationObjectFallback(duration, locale, options);
    }
    /**
     * Fallback реализация форматирования продолжительности из объекта
     *
     * @private
     * @param {DurationInput} duration - Объект с продолжительностью
     * @param {string} locale - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {string} Отформатированная строка продолжительности
     */
    static formatDurationObjectFallback(duration, locale, options) {
        const style = options?.style || 'long';
        // Конвертируем объект продолжительности в секунды для нашей существующей функции
        let totalSeconds = 0;
        if (duration.years)
            totalSeconds += duration.years * 31536000; // 365 дней
        if (duration.months)
            totalSeconds += duration.months * 2592000; // 30 дней
        if (duration.weeks)
            totalSeconds += duration.weeks * 604800; // 7 дней
        if (duration.days)
            totalSeconds += duration.days * 86400; // 24 часа
        if (duration.hours)
            totalSeconds += duration.hours * 3600; // 60 минут
        if (duration.minutes)
            totalSeconds += duration.minutes * 60; // 60 секунд
        if (duration.seconds)
            totalSeconds += duration.seconds;
        if (duration.milliseconds)
            totalSeconds += duration.milliseconds / 1000;
        // Используем существующую функцию formatDuration
        return this.formatDuration(totalSeconds, locale, {
            style,
            maxUnits: this.calculateMaxUnits(duration, options)
        });
    }
    /**
     * Рассчитывает максимальное количество единиц для отображения
     *
     * @private
     * @param {DurationInput} duration - Объект с продолжительностью
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {number} Максимальное количество единиц
     */
    // eslint-disable-next-line complexity
    static calculateMaxUnits(duration, options) {
        // Подсчитываем количество заданных единиц
        let unitCount = 0;
        if (duration.years && (options?.yearsDisplay === 'always' || duration.years > 0))
            unitCount++;
        if (duration.months && (options?.monthsDisplay === 'always' || duration.months > 0))
            unitCount++;
        if (duration.weeks && (options?.weeksDisplay === 'always' || duration.weeks > 0))
            unitCount++;
        if (duration.days && (options?.daysDisplay === 'always' || duration.days > 0))
            unitCount++;
        if (duration.hours && (options?.hoursDisplay === 'always' || duration.hours > 0))
            unitCount++;
        if (duration.minutes && (options?.minutesDisplay === 'always' || duration.minutes > 0))
            unitCount++;
        if (duration.seconds && (options?.secondsDisplay === 'always' || duration.seconds > 0))
            unitCount++;
        if (duration.milliseconds && (options?.millisecondsDisplay === 'always' || duration.milliseconds > 0))
            unitCount++;
        return unitCount || 2; // По умолчанию 2 единицы
    }
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
    static formatDurationWithIntl(seconds, locale = navigator.language, options) {
        // Конвертируем секунды в объект продолжительности
        const duration = this.secondsToDurationObject(seconds);
        return this.formatDurationObject(duration, locale, options);
    }
    /**
     * Конвертирует секунды в объект продолжительности
     *
     * @private
     * @param {number} seconds - Продолжительность в секундах
     * @returns {DurationInput} Объект продолжительности
     */
    static secondsToDurationObject(seconds) {
        const duration = {};
        // Для больших значений используем годы, месяцы, недели
        let remaining = seconds;
        if (remaining >= 31536000) {
            // 1 год = 365 дней
            duration.years = Math.floor(remaining / 31536000);
            remaining %= 31536000;
        }
        if (remaining >= 2592000) {
            // 1 месяц = 30 дней
            duration.months = Math.floor(remaining / 2592000);
            remaining %= 2592000;
        }
        if (remaining >= 604800) {
            // 1 неделя = 7 дней
            duration.weeks = Math.floor(remaining / 604800);
            remaining %= 604800;
        }
        if (remaining >= 86400) {
            // 1 день = 24 часа
            duration.days = Math.floor(remaining / 86400);
            remaining %= 86400;
        }
        if (remaining >= 3600) {
            // 1 час = 60 минут
            duration.hours = Math.floor(remaining / 3600);
            remaining %= 3600;
        }
        if (remaining >= 60) {
            // 1 минута = 60 секунд
            duration.minutes = Math.floor(remaining / 60);
            remaining %= 60;
        }
        if (remaining > 0 || seconds === 0) {
            duration.seconds = Math.floor(remaining);
            const milliseconds = Math.round((remaining - Math.floor(remaining)) * 1000);
            if (milliseconds > 0) {
                duration.milliseconds = milliseconds;
            }
        }
        return duration;
    }
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
    static formatDurationDigital(seconds, locale = navigator.language, options) {
        const showMilliseconds = options?.showMilliseconds || false;
        const forceHours = options?.forceHours || false;
        // Используем Intl.DurationFormat если доступен и поддерживает digital формат
        if (this.isDurationFormatSupported()) {
            try {
                const duration = this.secondsToDurationObject(seconds);
                const formatter = new Intl.DurationFormat(locale, {
                    style: 'digital',
                    hoursDisplay: forceHours ? 'always' : 'auto'
                });
                let result = formatter.format(duration);
                // Добавляем миллисекунды если нужно
                if (showMilliseconds && duration.milliseconds) {
                    const ms = duration.milliseconds.toString().padStart(3, '0');
                    result = result.replace(/(\d+)$/, `$1.${ms}`);
                }
                return result;
            }
            catch (error) {
                // Fallback на ручную реализацию
                console.warn('Digital format failed, using fallback:', error);
            }
        }
        // Fallback реализация
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const milliseconds = Math.round((seconds - Math.floor(seconds)) * 1000);
        const parts = [];
        if (forceHours || hours > 0) {
            parts.push(hours.toString().padStart(2, '0'));
        }
        parts.push(minutes.toString().padStart(2, '0'));
        parts.push(secs.toString().padStart(2, '0'));
        let result = parts.join(':');
        if (showMilliseconds && milliseconds > 0) {
            result += `.${milliseconds.toString().padStart(3, '0')}`;
        }
        return result;
    }
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
    static formatDuration(seconds, locale = navigator.language, options) {
        const style = options?.style || 'auto';
        // Для digital стиля используем специальный метод
        if (style === 'digital') {
            return this.formatDurationDigital(seconds, locale, {
                forceHours: seconds >= 3600
            });
        }
        // Для auto стиля определяем что использовать
        const effectiveStyle = style === 'auto'
            ? seconds < 3600
                ? 'digital'
                : 'long' // Для менее часа используем digital
            : style;
        if (effectiveStyle === 'digital') {
            return this.formatDurationDigital(seconds, locale);
        }
        // Используем Intl.DurationFormat если доступен и стиль не digital
        if (this.isDurationFormatSupported()) {
            try {
                const duration = this.secondsToDurationObject(seconds);
                const durationOptions = {
                    style: effectiveStyle,
                    hoursDisplay: 'auto',
                    minutesDisplay: 'auto',
                    secondsDisplay: seconds % 60 > 0 ? 'always' : 'auto'
                };
                return this.formatDurationObject(duration, locale, durationOptions);
            }
            catch (error) {
                // Fallback на существующую реализацию
                console.warn('Smart format failed, using fallback:', error);
            }
        }
        // Fallback на существующую реализацию
        return this.formatRelative(seconds, locale, {
            style: effectiveStyle,
            maxUnits: options?.maxUnits,
            units: options?.units
        });
    }
    /**
     * Разбивает отформатированную продолжительность на части
     * Полезно для кастомного отображения
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
    static formatDurationToParts(seconds, locale = navigator.language, options) {
        // Используем Intl.DurationFormat если доступен
        if (this.isDurationFormatSupported()) {
            try {
                const duration = this.secondsToDurationObject(seconds);
                const defaultOptions = {
                    style: 'long',
                    yearsDisplay: 'auto',
                    monthsDisplay: 'auto',
                    weeksDisplay: 'auto',
                    daysDisplay: 'auto',
                    hoursDisplay: 'auto',
                    minutesDisplay: 'auto',
                    secondsDisplay: 'auto'
                };
                const formatter = new Intl.DurationFormat(locale, {
                    ...defaultOptions,
                    ...options
                });
                return formatter.formatToParts(duration);
            }
            catch (error) {
                console.warn('formatToParts failed, using fallback:', error);
                // Fallback на эмуляцию
                return this.formatDurationToPartsFallback(seconds, locale, options);
            }
        }
        // Fallback эмуляция
        return this.formatDurationToPartsFallback(seconds, locale, options);
    }
    /**
     * Fallback эмуляция formatDurationToParts
     *
     * @private
     * @param {number} seconds - Продолжительность в секундах
     * @param {string} locale - Локаль для форматирования
     * @param {Intl.DurationFormatOptions} [options] - Опции форматирования
     * @returns {DurationFormatPart[]} Массив частей
     */
    static formatDurationToPartsFallback(seconds, locale, options) {
        const formatted = this.formatDurationWithIntl(seconds, locale, options);
        const parts = [];
        // Простая эмуляция - разбиваем по пробелам
        const tokens = formatted.split(/(\s+)/);
        for (const token of tokens) {
            if (token.trim() === '') {
                parts.push({ type: 'literal', value: token });
            }
            else {
                // Пытаемся определить тип токена
                const numMatch = token.match(/^\d+/);
                if (numMatch) {
                    parts.push({
                        type: 'integer',
                        value: numMatch[0],
                        unit: this.guessUnitFromToken(token, locale)
                    });
                }
                else {
                    parts.push({ type: 'literal', value: token });
                }
            }
        }
        return parts;
    }
    /**
     * Пытается определить единицу измерения из токена
     *
     * @private
     * @param {string} token - Токен
     * @param {string} locale - Локаль
     * @returns {string | undefined} Единица измерения
     */
    // eslint-disable-next-line complexity
    static guessUnitFromToken(token, locale) {
        const lowerToken = token.toLowerCase();
        // Для русского языка
        if (locale.startsWith('ru')) {
            if (lowerToken.includes('год') || lowerToken.includes('лет'))
                return 'year';
            if (lowerToken.includes('месяц'))
                return 'month';
            if (lowerToken.includes('недел'))
                return 'week';
            if (lowerToken.includes('дн') || lowerToken.includes('ден'))
                return 'day';
            if (lowerToken.includes('час'))
                return 'hour';
            if (lowerToken.includes('минут'))
                return 'minute';
            if (lowerToken.includes('секунд'))
                return 'second';
        }
        // Для английского языка
        if (locale.startsWith('en')) {
            if (lowerToken.includes('year'))
                return 'year';
            if (lowerToken.includes('month'))
                return 'month';
            if (lowerToken.includes('week'))
                return 'week';
            if (lowerToken.includes('day'))
                return 'day';
            if (lowerToken.includes('hour'))
                return 'hour';
            if (lowerToken.includes('minute') || lowerToken.includes('min'))
                return 'minute';
            if (lowerToken.includes('second') || lowerToken.includes('sec'))
                return 'second';
        }
        return 'second';
    }
    // #endregion
    // #region Format RelativeTime
    /**
     * Определяет, поддерживает ли браузер Intl.RelativeTimeFormat
     * Полезно для graceful degradation
     *
     * @returns {boolean} true если API поддерживается
     */
    static isRelativeTimeFormatSupported() {
        return typeof Intl !== 'undefined' && 'RelativeTimeFormat' in Intl;
    }
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
    static formatRelativeValue(value, unit, locale = navigator.language, options) {
        // Создаем форматтер с дефолтными настройками
        const defaultOptions = {
            numeric: 'auto', // 'auto' показывает "вчера", 'always' показывает "1 день назад"
            style: 'long' // 'long' (через 2 часа), 'short' (через 2 ч), 'narrow' (через 2ч)
        };
        const rtf = new Intl.RelativeTimeFormat(locale, {
            ...defaultOptions,
            ...options // Пользовательские опции переопределяют дефолтные
        });
        return rtf.format(value, unit);
    }
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
    // eslint-disable-next-line complexity
    static formatRelative(seconds, locale = navigator.language, options) {
        // Проверка на нулевую или отрицательную длительность
        if (seconds <= 0.5 || Number.isFinite(seconds) === false || Assert.emptyValue(seconds)) {
            return this.formatRelativeValue(0, 'second', locale, {
                numeric: 'auto',
                style: options?.style || 'long'
            });
        }
        // Список доступных единиц времени в порядке убывания
        const availableUnits = [
            { unit: 'year', secondsInUnit: 31536000, minValue: 1 }, // 365 дней
            { unit: 'month', secondsInUnit: 2592000, minValue: 1 }, // 30 дней
            { unit: 'week', secondsInUnit: 604800, minValue: 1 }, // 7 дней
            { unit: 'day', secondsInUnit: 86400, minValue: 1 }, // 24 часа
            { unit: 'hour', secondsInUnit: 3600, minValue: 1 }, // 60 минут
            { unit: 'minute', secondsInUnit: 60, minValue: 1 }, // 60 секунд
            { unit: 'second', secondsInUnit: 1, minValue: 0 } // 1 секунда
        ];
        // Настройки форматирования
        const style = options?.style || 'long';
        const maxUnits = options?.maxUnits || 2;
        // Создаем форматтер относительного времени
        const rtf = new Intl.RelativeTimeFormat(locale, {
            numeric: 'always', // Всегда показывать числа
            style
        });
        const parts = [];
        let remainingSeconds = seconds;
        // Используем пользовательские единицы или все доступные
        const unitsToUse = options?.units ? availableUnits.filter((u) => options.units.includes(u.unit)) : availableUnits;
        for (const { unit, secondsInUnit, minValue = 1 } of unitsToUse) {
            // Проверяем, есть ли достаточно секунд для этой единицы
            if (remainingSeconds >= secondsInUnit * minValue) {
                const count = Math.floor(remainingSeconds / secondsInUnit);
                if (count == 0)
                    continue;
                remainingSeconds %= secondsInUnit;
                // Добавляем отформатированную часть
                parts.push(rtf.format(count, unit));
                // Ограничиваем количество единиц в выводе
                if (parts.length >= maxUnits) {
                    break;
                }
            }
        }
        // Добавляем оставшиеся секунды, если нужно
        if (remainingSeconds > 1 && parts.length < maxUnits) {
            parts.push(rtf.format(remainingSeconds, 'second'));
        }
        // Обработка случая, когда длительность меньше секунды
        if (parts.length === 0) {
            return rtf.format(0, 'second');
        }
        // Специальная обработка для русского языка - добавляем "и" перед последней частью
        if (locale.startsWith('ru') && parts.length > 1) {
            let lastPart = parts.pop();
            // Убираем второе слово через
            lastPart = lastPart.replaceAll('через ', '').trimEnd();
            return `${parts.join(', ')} и ${lastPart}`;
        }
        // Для других языков используем запятые
        return parts.join(', ');
    }
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
    static formatRelativeOfDate(targetDate, locale = navigator.language, options) {
        const now = new Date();
        const diffMs = targetDate.getTime() - now.getTime();
        const diffSeconds = Math.round(diffMs / 1000);
        // Настройки форматирования
        const defaultOptions = {
            numeric: 'auto',
            style: 'long'
        };
        const rtf = new Intl.RelativeTimeFormat(locale, {
            ...defaultOptions,
            ...options
        });
        // Пороговые значения для разных единиц времени
        const thresholds = [
            { unit: 'year', threshold: 31536000 }, // 365 * 24 * 60 * 60
            { unit: 'month', threshold: 2592000 }, // 30 * 24 * 60 * 60
            { unit: 'week', threshold: 604800 }, // 7 * 24 * 60 * 60
            { unit: 'day', threshold: 86400 }, // 24 * 60 * 60
            { unit: 'hour', threshold: 3600 }, // 60 * 60
            { unit: 'minute', threshold: 60 }, // 60
            { unit: 'second', threshold: 0 } // Всегда показывать секунды
        ];
        const absDiff = Math.abs(diffSeconds);
        // Выбираем подходящую единицу времени
        for (const { unit, threshold } of thresholds) {
            if (absDiff >= threshold) {
                const value = Math.round(diffSeconds / threshold);
                if (Number.isFinite(value)) {
                    const result = rtf.format(value, unit);
                    return result;
                }
            }
        }
        // Фолбэк на секунды
        return rtf.format(diffSeconds, 'second');
    }
    // #endregion
    // #region Common
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
    static getWeekdays(locale = navigator.language, format = 'long') {
        const formatter = new Intl.DateTimeFormat(locale, {
            weekday: format,
            timeZone: 'UTC' // Используем UTC для избежания смещений
        });
        const days = [];
        // 4 января 1970 года - воскресенье по UTC
        for (let i = 0; i < 7; i++) {
            const date = new Date(Date.UTC(1970, 0, 4 + i));
            days.push(formatter.format(date));
        }
        return days;
    }
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
    static getMonths(locale = navigator.language, format = 'long') {
        const formatter = new Intl.DateTimeFormat(locale, {
            month: format,
            timeZone: 'UTC'
        });
        const months = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date(Date.UTC(1970, i, 1));
            months.push(formatter.format(date));
        }
        return months;
    }
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
    static toISOLocal(date) {
        const timezoneOffset = date.getTimezoneOffset() * 60000; // минуты в миллисекунды
        const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, -1); // Убираем 'Z' в конце
        return localISOTime;
    }
    /**
     * Получает доступные локали для форматирования дат
     *
     * @returns {string[]} Массив доступных локалей или пустой массив если не поддерживается
     */
    static getAvailableLocales() {
        if (!this.isDateTimeFormatSupported()) {
            return [];
        }
        try {
            return Intl.DateTimeFormat.supportedLocalesOf !== undefined ? Intl.DateTimeFormat.supportedLocalesOf([]) : [];
        }
        catch {
            return [];
        }
    }
}
//# sourceMappingURL=DateTimeFormatter.js.map