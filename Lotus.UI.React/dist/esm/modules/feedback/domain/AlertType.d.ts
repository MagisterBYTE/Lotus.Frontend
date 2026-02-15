/**
 * Массив значений типа информирования
 */
export declare const TAlertTypeValues: readonly ["error", "warning", "info", "success", "service"];
/**
 * Тип информирования
 */
export type TAlertType = (typeof TAlertTypeValues)[number];
/**
 * Enum типа информирования
 */
export declare const TAlertTypes: {
    readonly Error: "error";
    readonly Warning: "warning";
    readonly Info: "info";
    readonly Success: "success";
    readonly Service: "service";
    /**
     * Возвращает массив всех возможных значений
     */
    readonly getAllValues: () => typeof TAlertTypeValues;
    /**
     * Type Guard для проверки принадлежности значения к TAlertType
     */
    readonly isAlertType: (value: unknown) => value is TAlertType;
    /**
     * Возвращает значение по индексу
     */
    readonly getByIndex: (index: number) => TAlertType | undefined;
    /**
     * Возвращает значение по строковому имени
     */
    readonly getByName: (name: string) => TAlertType | undefined;
};
//# sourceMappingURL=AlertType.d.ts.map