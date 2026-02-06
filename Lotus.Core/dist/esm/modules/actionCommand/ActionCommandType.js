/**
 *  Массив значений типов команд действий
 */
export const TActionCommandTypeValues = ['default', 'navigation', 'delimiter'];
/**
 * Объект для представления стандартных типов команды действия
 */
export const TActionCommandTypes = {
    /**
     * Команда по умолчанию
     */
    Default: TActionCommandTypeValues[0],
    /**
     * Команда навигации
     */
    Navigation: TActionCommandTypeValues[1],
    /**
     * Не команда а разделитель
     */
    Delimiter: TActionCommandTypeValues[2],
    getAllValues() {
        return TActionCommandTypeValues;
    },
    isActionCommandType(value) {
        if (typeof value === 'string') {
            return TActionCommandTypeValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TActionCommandTypeValues[index];
    },
    getByName(name) {
        return TActionCommandTypeValues.find((v) => v === name);
    }
};
//# sourceMappingURL=ActionCommandType.js.map