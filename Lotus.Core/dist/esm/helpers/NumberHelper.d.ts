export declare class NumberHelper {
    /**
     * Сравнение числовых значений
     * @param left Левое значение
     * @param right Правое значение
     * @param isDesc Статус сравнения по убыванию
     * @returns Статус сравнения
     */
    static compare(left?: number, right?: number, isDesc?: boolean): number;
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static isFlagSet(value: number, flag: number): boolean;
    /**
     * Установка флага
     * @param value Значение
     * @param flag Флаг
     * @returns Новое значение
     */
    static setFlag(value: number, flags: number): number;
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static clearFlag(value: number, flags: number): number;
}
//# sourceMappingURL=NumberHelper.d.ts.map