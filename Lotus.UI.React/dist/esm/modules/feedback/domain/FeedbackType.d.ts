/**
 * Массив значений типов обратной связи
 */
export declare const TFeedbackTypeValues: readonly ["alert", "snackbar", "modal", "progress"];
/**
 * Тип обратной связи
 */
export type TFeedbackType = (typeof TFeedbackTypeValues)[number];
/**
 * Enum типа обратной связи
 */
export declare const TFeedbackTypes: {
    /**
     * Простое предупреждение без взаимодействия
     */
    readonly Alert: "alert";
    /**
     * Информирование с возможностью взаимодействия
     */
    readonly Snackbar: "snackbar";
    /**
     * Модальное окно
     */
    readonly Modal: "modal";
    /**
     * Информирование с прогрессом
     */
    readonly Progress: "progress";
    /**
     * Возвращает массив всех возможных значений
     */
    readonly getAllValues: () => typeof TFeedbackTypeValues;
    /**
     * Type Guard для проверки принадлежности значения к TFeedbackType
     */
    readonly isFeedbackType: (value: unknown) => value is TFeedbackType;
    /**
     * Возвращает значение по индексу
     */
    readonly getByIndex: (index: number) => TFeedbackType | undefined;
    /**
     * Возвращает значение по строковому имени
     */
    readonly getByName: (name: string) => TFeedbackType | undefined;
};
//# sourceMappingURL=FeedbackType.d.ts.map