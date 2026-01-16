import { Assert } from '#utils';
export class DateTimeConverter {
    /**
     * Преобразование объекта в значение даты-времени.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
     * @returns Значение.
     */
    static toDateTime(value, defaultValue = new Date(Date.now())) {
        if (value === null || value === undefined)
            return defaultValue;
        if (value instanceof Date) {
            return new Date(value.getTime()); // Создаем копию
        }
        if (typeof value === 'number')
            return DateTimeConverter.fromTimestamp(value);
        if (typeof value === 'string')
            return DateTimeConverter.parse(value, defaultValue);
        return defaultValue;
    }
    /**
     * Преобразование в текст, который можно сконвертировать в тип дата-время.
     * @param text Текст.
     * @param formatDate Формат даты-времени.
     * @returns Текст или undefined, если сконвертировать невозможно.
     */
    static parsableText(text, formatDate) {
        if (!text)
            return undefined;
        const date = DateTimeConverter.tryParseDate(text);
        if (date)
            return date.toLocaleString();
        if (!formatDate)
            return undefined;
        switch (formatDate) {
            case '%s':
                return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), DateTimeConverter.parseSecond(text)).toLocaleString();
            case '%m':
                return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), DateTimeConverter.parseMinute(text), 0).toLocaleString();
            case '%H':
                return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), DateTimeConverter.parseHour(text), 0, 0).toLocaleString();
            case 'H:m:s':
                return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), DateTimeConverter.parseHour(text), 0, 0).toLocaleString();
            default:
                return undefined;
        }
    }
    /**
     * Преобразование текста в объект дата-время.
     * @param text Текст.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
     * @returns Значение.
     */
    static parse(text, defaultValue = new Date(Date.now())) {
        if (Assert.emptyValue(text))
            return defaultValue;
        const date = DateTimeConverter.tryParseDate(text);
        return date ? date : defaultValue;
    }
    /**
     * Преобразование текста в объект дата-время.
     * @param text Текст.
     * @param result Значение.
     * @returns Статус успешности преобразования.
     */
    static tryParse(text, result) {
        if (!text) {
            result = new Date(0);
            return false;
        }
        const date = DateTimeConverter.tryParseDate(text);
        if (date) {
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
    static parseHour(text) {
        const value = parseInt(text, 10);
        return Math.min(23, value);
    }
    /**
     * Преобразование текста в минуту.
     * @param text Текст.
     * @returns Значение минуты в пределах от 0 до 59.
     */
    static parseMinute(text) {
        const value = parseInt(text, 10);
        return Math.min(59, value);
    }
    /**
     * Преобразование текста в секунду.
     * @param text Текст.
     * @returns Значение секунды в пределах от 0 до 59.
     */
    static parseSecond(text) {
        const value = parseInt(text, 10);
        return Math.min(59, value);
    }
    /**
     * Получить значение даты-времени через временную метку.
     * @param value Временная метка.
     * @returns Значение даты-времени.
     */
    static fromTimestamp(value) {
        return new Date(value * 1000);
    }
    /**
     * Преобразовать значение даты-времени во временную метку.
     * @param value Значение даты-времени.
     * @returns Временная метка.
     */
    static toTimestamp(value) {
        return Math.floor(value.getTime() / 1000);
    }
    static tryParseDate(text) {
        let date = new Date(text);
        if (!isNaN(date.getTime()))
            return date;
        date = new Date(Date.parse(text));
        if (!isNaN(date.getTime()))
            return date;
        return undefined;
    }
}
//# sourceMappingURL=DateTimeConverter.js.map