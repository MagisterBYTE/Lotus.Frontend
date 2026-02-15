/**
 * Массив значений типов обратной связи
 */
export const TFeedbackTypeValues = ['alert', 'snackbar', 'modal', 'progress'];
/**
 * Enum типа обратной связи
 */
export const TFeedbackTypes = {
    /**
     * Простое предупреждение без взаимодействия
     */
    Alert: TFeedbackTypeValues[0],
    /**
     * Информирование с возможностью взаимодействия
     */
    Snackbar: TFeedbackTypeValues[1],
    /**
     * Модальное окно
     */
    Modal: TFeedbackTypeValues[2],
    /**
     * Информирование с прогрессом
     */
    Progress: TFeedbackTypeValues[3],
    /**
     * Возвращает массив всех возможных значений
     */
    getAllValues() {
        return TFeedbackTypeValues;
    },
    /**
     * Type Guard для проверки принадлежности значения к TFeedbackType
     */
    isFeedbackType(value) {
        if (typeof value === 'string') {
            return TFeedbackTypeValues.includes(value);
        }
        return false;
    },
    /**
     * Возвращает значение по индексу
     */
    getByIndex(index) {
        return TFeedbackTypeValues[index];
    },
    /**
     * Возвращает значение по строковому имени
     */
    getByName(name) {
        return TFeedbackTypeValues.find((v) => v === name);
    }
};
//# sourceMappingURL=FeedbackType.js.map