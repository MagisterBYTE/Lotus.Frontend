export declare class DateTimeConverter {
    /**
     * Преобразование объекта в значение даты-времени.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
     * @returns Значение.
     */
    static toDateTime(value: any, defaultValue?: Date): Date;
    /**
     * Преобразование в текст, который можно сконвертировать в тип дата-время.
     * @param text Текст.
     * @param formatDate Формат даты-времени.
     * @returns Текст или null, если сконвертировать невозможно.
     */
    static parsableText(text: string, formatDate: string): string | null;
    /**
     * Преобразование текста в объект дата-время.
     * @param text Текст.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось.
     * @returns Значение.
     */
    static parse(text: string, defaultValue?: Date): Date;
    /**
     * Преобразование текста в объект дата-время.
     * @param text Текст.
     * @param result Значение.
     * @returns Статус успешности преобразования.
     */
    static tryParse(text: string, result: Date): boolean;
    /**
     * Преобразование текста в час.
     * @param text Текст.
     * @returns Значение часа в пределах от 0 до 24.
     */
    static parseHour(text: string): number;
    /**
     * Преобразование текста в минуту.
     * @param text Текст.
     * @returns Значение минуты в пределах от 0 до 59.
     */
    static parseMinute(text: string): number;
    /**
     * Преобразование текста в секунду.
     * @param text Текст.
     * @returns Значение секунды в пределах от 0 до 59.
     */
    static parseSecond(text: string): number;
    /**
     * Получить значение даты-времени через временную метку.
     * @param value Временная метка.
     * @returns Значение даты-времени.
     */
    static fromTimestamp(value: number): Date;
    /**
     * Преобразовать значение даты-времени во временную метку.
     * @param value Значение даты-времени.
     * @returns Временная метка.
     */
    static toTimestamp(value: Date): number;
    private static tryParseDate;
}
