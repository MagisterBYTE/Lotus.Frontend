export declare abstract class NumberConverter {
    /**
     * Преобразование в текст который можно сконвертировать в целый тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextInt(text: string): string;
    /**
     * Преобразование текста в целое число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static parseInt(text: string, defaultValue?: number): number;
    /**
     * Преобразование объекта в целое число.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toInteger(value: unknown, defaultValue?: number): number;
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param isNullable Статус поддержки Nullable.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toIntegerNullable(value: unknown, isNullable: boolean, defaultValue?: number): number | undefined;
    /**
     * Преобразование в текст который можно сконвертировать в вещественный тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextFloat(text: string): string;
    /**
     * Преобразование текста в вещественное число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static parseFloat(text: string, defaultValue?: number): number;
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toFloat(value: unknown, defaultValue?: number): number;
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param isNullable Статус поддержки Nullable.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toFloatNullable(value: unknown, isNullable: boolean, defaultValue?: number): number | undefined;
}
//# sourceMappingURL=NumberConverter.d.ts.map