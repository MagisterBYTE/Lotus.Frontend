export class NumberConverter {
    // #region Integer
    /**
     * Преобразование в текст который можно сконвертировать в целый тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextInt(text) {
        let numberText = '';
        let add_minus = false;
        const max = 11;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
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
    // #endregion
    // #region Float
    /**
     * Преобразование в текст который можно сконвертировать в вещественный тип
     * @param text Текст
     * @returns Текст
     */
    static parsableTextFloat(text) {
        let numberText = '';
        let add_minus = false;
        let add_dot = false;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
                continue;
            }
            if ((c == ',' || c == '.') && (i != text.length - 1) && add_dot == false) {
                numberText += '.';
                add_dot = true;
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
}
