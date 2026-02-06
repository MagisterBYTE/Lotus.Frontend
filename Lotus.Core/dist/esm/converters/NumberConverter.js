export class NumberConverter {
    // #region Integer
    /**
     * Преобразование в текст который можно сконвертировать в целый тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextInt(text) {
        let numberText = '';
        let addMinus = false;
        const max = 11;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && addMinus == false) {
                numberText += c;
                addMinus = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
                numberText += c;
            }
            if (numberText.length > max) {
                break;
            }
        }
        return numberText;
    }
    /**
     * Преобразование текста в целое число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static parseInt(text, defaultValue = 0) {
        text = NumberConverter.parsableTextInt(text);
        const resultValue = Number.parseInt(text);
        if (Number.isNaN(resultValue)) {
            return defaultValue;
        }
        return resultValue;
    }
    /**
     * Преобразование объекта в целое число.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toInteger(value, defaultValue = -1) {
        if (value === null || value === undefined)
            return defaultValue;
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string') {
            const num = Number.parseInt(value);
            return Number.isNaN(num) ? defaultValue : num;
        }
        return defaultValue;
    }
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param isNullable Статус поддержки Nullable.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toIntegerNullable(value, isNullable, defaultValue = -1) {
        if (value === null || value === undefined)
            return isNullable ? undefined : defaultValue;
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string') {
            const num = Number.parseInt(value);
            return Number.isNaN(num) ? (isNullable ? undefined : defaultValue) : num;
        }
        return isNullable ? undefined : defaultValue;
    }
    // #endregion
    // #region Float
    /**
     * Преобразование в текст который можно сконвертировать в вещественный тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextFloat(text) {
        let numberText = '';
        let addMinus = false;
        let addDot = false;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && addMinus == false) {
                numberText += c;
                addMinus = true;
                continue;
            }
            if ((c == ',' || c == '.') && (i != text.length - 1) && addDot == false) {
                numberText += '.';
                addDot = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
                numberText += c;
            }
        }
        return numberText;
    }
    /**
     * Преобразование текста в вещественное число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static parseFloat(text, defaultValue = 0) {
        text = NumberConverter.parsableTextFloat(text);
        const resultValue = Number.parseFloat(text);
        if (Number.isNaN(resultValue)) {
            return defaultValue;
        }
        return resultValue;
    }
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toFloat(value, defaultValue = -1) {
        if (value === null || value === undefined)
            return defaultValue;
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string') {
            const num = Number.parseFloat(value);
            return Number.isNaN(num) ? defaultValue : num;
        }
        return defaultValue;
    }
    /**
     * Преобразование объекта в вещественное число.
     * @param value Объект.
     * @param isNullable Статус поддержки Nullable.
     * @param defaultValue Значение по умолчанию, если преобразовать не удалось (по умолчанию -1).
     * @returns Значение.
     */
    static toFloatNullable(value, isNullable, defaultValue = -1) {
        if (value === null || value === undefined)
            return isNullable ? undefined : defaultValue;
        if (typeof value === 'number')
            return value;
        if (typeof value === 'string') {
            const num = Number.parseFloat(value);
            return Number.isNaN(num) ? (isNullable ? undefined : defaultValue) : num;
        }
        return isNullable ? undefined : defaultValue;
    }
}
//# sourceMappingURL=NumberConverter.js.map