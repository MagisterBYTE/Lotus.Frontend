export declare abstract class BooleanConverter {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static readonly TrueValues: readonly string[];
    /**
     * Преобразование объекта в логическое значение.
     * @param item Объект.
     * @param defaultValue Значение по умолчанию если преобразовать не удалось.
     * @returns Логическое значение.
     */
    static toBoolean(item: unknown, defaultValue?: boolean): boolean;
    /**
     * Преобразование объекта в логическое значение.
     * @param item Объект.
     * @param isNullable Статус поддержки Nullable.
     * @param defaultValue Значение по умолчанию если преобразовать не удалось.
     * @returns Логическое значение.
     */
    static toBooleanNullable(item: unknown, isNullable: boolean, defaultValue?: boolean): boolean | undefined;
    /**
     * Преобразование текста в логическое значение.
     * @param value Текст.
     * @returns Логическое значение.
     */
    static parse(value: string): boolean;
}
//# sourceMappingURL=BooleanConverter.d.ts.map