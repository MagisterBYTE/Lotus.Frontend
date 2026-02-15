/**
 * Массив значений типа информирования
 */
export const TAlertTypeValues = ['error', 'warning', 'info', 'success', 'service'];
/**
 * Enum типа информирования
 */
export const TAlertTypes = {
    Error: TAlertTypeValues[0],
    Warning: TAlertTypeValues[1],
    Info: TAlertTypeValues[2],
    Success: TAlertTypeValues[3],
    Service: TAlertTypeValues[4],
    /**
     * Возвращает массив всех возможных значений
     */
    getAllValues() {
        return TAlertTypeValues;
    },
    /**
     * Type Guard для проверки принадлежности значения к TAlertType
     */
    isAlertType(value) {
        if (typeof value === 'string') {
            return TAlertTypeValues.includes(value);
        }
        return false;
    },
    /**
     * Возвращает значение по индексу
     */
    getByIndex(index) {
        return TAlertTypeValues[index];
    },
    /**
     * Возвращает значение по строковому имени
     */
    getByName(name) {
        return TAlertTypeValues.find((v) => v === name);
    }
};
//# sourceMappingURL=AlertType.js.map