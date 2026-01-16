export class BooleanConverter {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static TrueValues = [
        'True',
        'true',
        '1',
        'on',
        'On',
        'истина',
        'Истина',
        'да',
        'Да'
    ];
    /**
     * Преобразование объекта в логическое значение.
     * @param item Объект.
     * @param defaultValue Значение по умолчанию если преобразовать не удалось.
     * @returns Логическое значение.
     */
    static toBoolean(item, defaultValue = false) {
        if (item) {
            if (typeof item == 'boolean') {
                return item;
            }
            if (typeof item == 'string') {
                return BooleanConverter.TrueValues.indexOf(item) > -1;
            }
            if (typeof item == 'number') {
                return Boolean(item);
            }
        }
        return defaultValue;
    }
    /**
     * Преобразование текста в логическое значение.
     * @param value Текст.
     * @returns Логическое значение.
     */
    static parse(value) {
        return BooleanConverter.TrueValues.indexOf(value) > -1;
    }
}
//# sourceMappingURL=BooleanConverter.js.map